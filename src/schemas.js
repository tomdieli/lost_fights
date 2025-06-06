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

export { State, PlayerState };