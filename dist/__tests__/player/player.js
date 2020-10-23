"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const player_1 = require("../../src/player/player");
var player = new player_1.Player;
afterEach(() => {
    player.reset();
});
describe("Player()", function () {
    it("has '0,0' as a starting location", function () {
        expect(player.position).toEqual({ x: 0, y: 0 });
    });
    it("have north as a default direction", function () {
        expect(player.direction).toEqual("North");
    });
    it("have steps in the direction facing", function () {
        player.step();
        expect(player.position).toEqual({ x: 0, y: 1 });
    });
    it("have steps in the direction facing", function () {
        player.left();
        player.step();
        expect(player.position).toEqual({ x: -1, y: 0 });
    });
    it("have steps in the direction facing", function () {
        player.right();
        player.step();
        expect(player.position).toEqual({ x: 1, y: 0 });
    });
});
//# sourceMappingURL=player.js.map