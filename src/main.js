import { Application, Assets, Graphics, Text, Container } from "pixi.js";
import { Player } from './player';
import { createButton } from './controls';

(async () => {
  // Create a new application
  const app = new Application();

  // Initialize the application
  await app.init({ background: "#1099bb", resizeTo: window });

  // Append the application canvas to the document body
  document.getElementById("pixi-container").appendChild(app.canvas);

  // Load the assets
  await Assets.load(['assets/stick_stand1.png', 'assets/stick_stand2.png',
    'assets/stick_walk1.png', 'assets/stick_walk2.png', 'assets/stick_block1.png',
    'assets/stick_block2.png'
  ]);

  const player = new Player();

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
    () => player.walk(), // Pointer down action
    () => player.stand() // Pointer up action
  );

  // Create the block button
  const blockButton = createButton(
    "Block",
    buttonStyle,
    100,
    50,
    () => player.block(), // Pointer down action
    () => player.stand() // Pointer up action
  );

  // Position the buttons
  walkButton.x = 50;
  walkButton.y = 50;

  blockButton.x = 50;
  blockButton.y = 120;

  // Add buttons to the stage
  app.stage.addChild(walkButton);
  app.stage.addChild(blockButton);
  app.stage.addChild(player.view);

  // Game loop
  app.ticker.add(() => {
    if (player.isMoving) {
      // Update the sprite's position
      player.animation.x += 1;
    }
  });

})();
