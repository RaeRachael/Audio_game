"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const input_1 = require("../../src/input/input");
const player_1 = require("../../src/player/player");
jest.mock("../../src/player/player", () => ({
    Player: jest.fn().mockImplementation(() => {
        return {
            step: jest.fn(),
            left: jest.fn(),
            right: jest.fn(),
            reset: jest.fn(),
        };
    })
}));
describe("Input responses", function () {
    describe("keyPress - step forward", function () {
        it("calls player.step", function () {
            var mockedPlayer = new player_1.Player;
            var input = new input_1.Input(mockedPlayer);
            var key = "ArrowUp";
            input.keyResponse(key);
            expect(input.player.step).toBeCalledTimes(1);
        });
    });
    describe("keyPress - turn left", function () {
        it("calls player.left", function () {
            var mockedPlayer = new player_1.Player;
            var input = new input_1.Input(mockedPlayer);
            var key = "ArrowLeft";
            input.keyResponse(key);
            expect(input.player.left).toBeCalledTimes(1);
        });
    });
    describe("keyPress - turn right", function () {
        it("calls player.right", function () {
            var mockedPlayer = new player_1.Player;
            var input = new input_1.Input(mockedPlayer);
            var key = "ArrowRight";
            input.keyResponse(key);
            expect(input.player.right).toBeCalledTimes(1);
        });
    });
});
//# sourceMappingURL=input.js.map