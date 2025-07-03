import { boot, ColyseusTestServer } from "@colyseus/testing";
import { MyRoom } from "../myRoom.js";

console.log("top of file");

describe("MyRoom", () => {
  let colyseus;

  console.log("before boot");

  beforeAll(async () => {
    console.log("in beforeAll");
    await boot({
      gameServer: (gameServer) => {
        console.log("in boot callback");
        gameServer.define("game_room", MyRoom);
      },
      port: 2657,
    });

    colyseus = new ColyseusTestServer({ port: 2657 });
  });

  afterAll(async () => {
    await colyseus?.cleanup();
  });

  test("should create room with empty state", async () => {
    const room = await colyseus.createRoom("game_room", {});
    expect(room.state.players.size).toBe(0);
  });
});