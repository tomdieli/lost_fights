import { Application, Assets, Graphics, Text, Container } from "pixi.js";
import { Player } from './player';
import { createButton } from './controls';
import { Client } from "colyseus.js";
import { State, PlayerState } from './schemas';

const client = new Client("ws://localhost:2567");
let room;
let mySessionId;
let playerSprites = {}; // Move this here

(async () => {
  // Create a new application
  const app = new Application();

  // Initialize the application
  await app.init({ background: "#1099bb", resizeTo: window });

  // Append the application canvas to the document body
  document.getElementById("pixi-container").appendChild(app.canvas);

  // Load the assets
  await Assets.load([
    '/assets/stick_stand1.png', '/assets/stick_stand2.png',
    '/assets/stick_walk1.png', '/assets/stick_walk2.png',
    '/assets/stick_block1.png', '/assets/stick_block2.png'
  ]);

  // Define the button text style
  const buttonStyle = {
    fontFamily: "Arial",
    fontSize: 20,
    fill: 0x000000, // Black text color
  };

  // Create the walk button
  const walkButton = createButton(
    "Advance",
    buttonStyle,
    100,
    50,
    () => {
      const myPlayer = playerSprites[mySessionId];
      if (myPlayer) myPlayer.walk();
    }, // Pointer down action
    () => {
      const myPlayer = playerSprites[mySessionId];
      if (myPlayer) myPlayer.stand();
    } // Pointer up action
  );

  // Create the block button
  const blockButton = createButton(
    "Block",
    buttonStyle,
    100,
    50,
    () => {
      const myPlayer = playerSprites[mySessionId];
      if (myPlayer) myPlayer.block();
    }, // Pointer down action
    () => {
      const myPlayer = playerSprites[mySessionId];
      if (myPlayer) myPlayer.stand();
    } // Pointer up action
  );

  // Position the buttons
  walkButton.x = 50;
  walkButton.y = 50;

  blockButton.x = 50;
  blockButton.y = 120;

  // Add buttons to the stage
  app.stage.addChild(walkButton);
  app.stage.addChild(blockButton);
  // app.stage.addChild(player.view);

  // Connect to Colyseus room
  console.log("Connecting to room...");
  room = await client.joinOrCreate("game_room");
  mySessionId = room.sessionId;
  console.log("Connected to room:", room.sessionId);
  console.log("Room state after connection:", room.state); // Is state defined?
  console.log("Players map after connection:", room.state?.players); // Is players defined?

  // Only set up state handlers once
  room.onStateChange((state) => {
    console.log("State change:", {
      sessionId: room.sessionId,
      playerKeys: Array.from(state.players.keys())
    });

    if (state.players) {
      state.players.forEach((player, key) => {
        console.log("Processing player:", key);
        if (!playerSprites[key]) {
          createPlayerSprite(player, key);
        }
      });
    }
  });
  
  // Helper function to create a new player sprite
  function createPlayerSprite(player, key) {
    console.log("Creating player sprite:", key);
    const newPlayer = new Player();
    newPlayer.view.x = player.x;
    newPlayer.view.y = player.y;
    app.stage.addChild(newPlayer.view);
    playerSprites[key] = newPlayer;

    if (key === mySessionId) {
      console.log("This is my player:", key);
      window.myPlayer = newPlayer;
    }
  }

  // Helper function to update existing player sprite
  function updatePlayerSprite(player, key) {
    const existingPlayer = playerSprites[key];
    if (existingPlayer) {
      if (player.action === "walk") existingPlayer.walk();
      else if (player.action === "block") existingPlayer.block();
      else existingPlayer.stand();
      
      existingPlayer.view.x = player.x;
      existingPlayer.view.y = player.y;
    }
  }

  // Add debug logs for connection events
  room.onJoin(() => {
    console.log("Joined room successfully");
  });

  room.onLeave((code) => {
    console.log("Left room:", code);
  });

  // Add error handler to catch any room-related errors
  room.onError((code, message) => {
    console.error("Room error:", code, message);
  });

  // Example: Send movement to server
  walkButton.on("pointerdown", () => {
    const myPlayer = playerSprites[mySessionId];
    if (myPlayer) {
      myPlayer.walk();
      room.send("move", { action: "walk", x: myPlayer.view.x, y: myPlayer.view.y });
      console.log("Sent move:", { action: "walk", x: myPlayer.view.x, y: myPlayer.view.y });
    }
  });
  walkButton.on("pointerup", () => {
    const myPlayer = playerSprites[mySessionId];
    if (myPlayer) {
      myPlayer.stand();
      room.send("move", { action: "stand", x: myPlayer.view.x, y: myPlayer.view.y });
    }
  });

  // Listen for other players' actions (expand as needed)
  room.onMessage("move", (data) => {
    const player = playerSprites[data.sessionId];
    if (player) {
      player.view.x = data.x;
      player.view.y = data.y;
      if (data.action === "walk") player.walk();
      else if (data.action === "block") player.block();
      else player.stand();
    }
  });

  // Game loop
  app.ticker.add(() => {
    const myPlayer = playerSprites[mySessionId];
    if (myPlayer && myPlayer.isMoving) {
      // Update the sprite's position
      myPlayer.view.x += 1;
      
      // Send the updated position to the server 
      room.send("move", { action: "walk", x: myPlayer.view.x, y: myPlayer.view.y });
    }
  });

})();
