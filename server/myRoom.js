import { Room } from "colyseus";
import { Schema, MapSchema, type } from "@colyseus/schema";

class PlayerState extends Schema {
  constructor() {
    super();
    this.x = 50;
    this.y = 200;
    this.action = "stand";
  }
}
type("number")(PlayerState.prototype, "x");
type("number")(PlayerState.prototype, "y");
type("string")(PlayerState.prototype, "action");

class State extends Schema {
  constructor() {
    super();
    this.players = new MapSchema();
  }
}
type({ map: PlayerState })(State.prototype, "players");

export class MyRoom extends Room {
  onCreate() {
    console.log("Room created");
    this.state = new State();

    this.onMessage("move", (client, data) => {
      const player = this.state.players.get(client.sessionId);
      if (player) {
        // Direct property assignment instead of Object.assign
        player.x = data.x;
        player.y = data.y;
        player.action = data.action;
        
        console.log("Player moved:", {
          id: client.sessionId,
          x: player.x,
          y: player.y,
          action: player.action
        });
      }
    });
  }

  onJoin(client) {
    console.log("Client joined:", client.sessionId);
    this.state.players.set(client.sessionId, new PlayerState());
    console.log("Added player state:", {
      id: client.sessionId,
      playerCount: this.state.players.size,
      players: Array.from(this.state.players.keys())
    });
  }

  onLeave(client) {
    console.log("Client left:", client.sessionId);
    // Use delete() method from MapSchema
    this.state.players.delete(client.sessionId);
    console.log("Remaining players:", Array.from(this.state.players.keys()));
  }
}