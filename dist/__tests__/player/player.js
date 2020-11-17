import { Audio } from "../../src/audio/audio";
import { Level } from "../../src/level/level";
import { displayText } from "../../src/main";
import { Player } from "../../src/player/player";
jest.mock("../../src/audio/audio", () => ({
    Audio: jest.fn().mockImplementation(() => {
        return {
            audioSequence: jest.fn(),
            secondClickAudio: jest.fn(),
        };
    })
}));
jest.mock("../../src/main", () => ({ displayText: jest.fn() }));
var levelMap = [{
        "position": { "x": 0, "y": 0 },
        "paths": { "North": true, "South": false, "East": true, "West": true },
        "openPaths": { "North": false, "South": false, "East": false, "West": false },
        "numberOpenPaths": 0,
        "exitTile": false
    }, {
        "position": { "x": 0, "y": 1 },
        "paths": { "North": true, "South": true, "East": false, "West": false },
        "openPaths": { "North": false, "South": false, "East": false, "West": false },
        "numberOpenPaths": 0,
        "exitTile": false
    }, {
        "position": { "x": -1, "y": 0 },
        "paths": { "North": false, "South": false, "East": true, "West": false },
        "openPaths": { "North": false, "South": false, "East": false, "West": false },
        "numberOpenPaths": 0,
        "exitTile": false
    }, {
        "position": { "x": 1, "y": 0 },
        "paths": { "North": false, "South": false, "East": false, "West": true },
        "openPaths": { "North": false, "South": false, "East": false, "West": false },
        "numberOpenPaths": 0,
        "exitTile": false
    }, {
        "position": { "x": 0, "y": 2 },
        "paths": { "North": false, "South": true, "East": false, "West": false },
        "openPaths": { "North": false, "South": false, "East": false, "West": false },
        "numberOpenPaths": 0,
        "exitTile": true
    }];
var mockedlevel = new Level(levelMap);
var player = new Player;
player.setLevel(mockedlevel);
player.addAudio(new Audio);
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
    describe("when unblocked", function () {
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
    describe("when blocked", function () {
        it("does not step forward", function () {
            player.left();
            player.left();
            player.step();
            expect(player.position).toEqual({ x: 0, y: 0 });
        });
    });
    describe("calls displayText if on exit tile", function () {
        it("does not step forward", function () {
            player.step();
            player.step();
            expect(displayText).toBeCalledTimes(1);
        });
    });
});
//# sourceMappingURL=player.js.map