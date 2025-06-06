import { Room } from "@colyseus/core";
import { Client } from "colyseus.js";
import { MyRoom } from "../myRoom";

describe("MyRoom", () => {
  let room;

  beforeEach(() => {
    room = new MyRoom();
    room.onCreate({});
  });

  afterEach(() => {
    // Remove disconnect since it can't be called during onCreate
    room = null;
  });

  test("should create room with empty state", () => {
    expect(room.state.players.size).toBe(0);
  });

  test("should add player on join", () => {
    const client = { sessionId: "test-client" };
    room.onJoin(client);
    
    expect(room.state.players.size).toBe(1);
    expect(room.state.players.get(client.sessionId)).toBeDefined();
    expect(room.state.players.get(client.sessionId).x).toBe(50);
    expect(room.state.players.get(client.sessionId).y).toBe(200);
    expect(room.state.players.get(client.sessionId).action).toBe("stand");
  });

  test("should remove player on leave", () => {
    const client = { sessionId: "test-client" };
    room.onJoin(client);
    
    // Verify player was added
    expect(room.state.players.size).toBe(1);
    
    room.onLeave(client);
    
    // Use has() to check if player exists
    expect(room.state.players.has(client.sessionId)).toBe(false);
    expect(room.state.players.size).toBe(0);
  });

  test("should update player position on move message", () => {
    const client = { sessionId: "test-client" };
    const moveData = {
      x: 100,
      y: 150,
      action: "walk"
    };
    
    room.onJoin(client);
    
    // Simulate message handling
    room.onMessage("move", client, moveData);
    
    const player = room.state.players.get(client.sessionId);
    expect(player).toBeDefined();
    expect(player.x).toBe(moveData.x);
    expect(player.y).toBe(moveData.y);
    expect(player.action).toBe(moveData.action);
  });
});