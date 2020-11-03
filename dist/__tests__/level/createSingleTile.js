import { LevelCreator } from "../../src/level/levelCreator";
beforeEach(() => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.123456789);
});
afterEach(() => {
    jest.spyOn(global.Math, 'random').mockRestore();
});
describe("function createSingleTile(previousTile)", function () {
    var previousTile = {
        "position": { "x": 0, "y": 0 },
        "paths": { "North": false, "South": false, "East": false, "West": false },
        "openPaths": { "North": false, "South": false, "East": false, "West": false },
        "exitTile": false
    };
    var levelMap = [previousTile];
    var levelCreator = new LevelCreator;
    it("creates a non exitTile", function () {
        var secondTile = levelCreator.createSingleTile(previousTile, levelMap);
        expect(secondTile.exitTile).toEqual(false);
    });
    describe("created tile has correct position and return path based on the openPath", function () {
        it("the second tile is at '0,1' and path 'South' is true if openPath is 'North'", function () {
            previousTile.position = { x: 0, y: 0 };
            previousTile.paths = { "North": true, "South": false, "East": false, "West": false };
            previousTile.openPaths = { "North": true, "South": false, "East": false, "West": false };
            var levelMap = [previousTile];
            var secondTile = levelCreator.createSingleTile(previousTile, levelMap);
            expect(secondTile.position).toEqual({ x: 0, y: 1 });
            expect(secondTile.paths.South).toEqual(true);
        });
        it("the second tile is at '1,0' and path 'West' if openPath is 'East'", function () {
            previousTile.position = { x: 0, y: 0 };
            previousTile.paths = { "North": false, "South": false, "East": true, "West": false };
            previousTile.openPaths = { "North": false, "South": false, "East": true, "West": false };
            var levelMap = [previousTile];
            var secondTile = levelCreator.createSingleTile(previousTile, levelMap);
            expect(secondTile.position).toEqual({ x: 1, y: 0 });
            expect(secondTile.paths.West).toEqual(true);
        });
        it("the second tile is at '1,0' if openPath is 'South'", function () {
            previousTile.position = { x: 1, y: 1 };
            previousTile.paths = { "North": false, "South": true, "East": false, "West": false };
            previousTile.openPaths = { "North": false, "South": true, "East": false, "West": false };
            var levelMap = [previousTile];
            var secondTile = levelCreator.createSingleTile(previousTile, levelMap);
            expect(secondTile.position).toEqual({ x: 1, y: 0 });
        });
        it("the second tile is at '0,1' if openPath is 'West'", function () {
            previousTile.position = { x: 1, y: 1 };
            previousTile.paths = { "North": false, "South": false, "East": false, "West": true };
            previousTile.openPaths = { "North": false, "South": false, "East": false, "West": true };
            var levelMap = [previousTile];
            var levelCreator = new LevelCreator;
            var secondTile = levelCreator.createSingleTile(previousTile, levelMap);
            expect(secondTile.position).toEqual({ x: 0, y: 1 });
        });
        describe("multiple open paths of a tile", function () {
            it("the second tile is at '2,1', third is at '0,1', if openPaths are 'North, South'", function () {
                previousTile.position = { x: 1, y: 1 };
                previousTile.paths = { "North": true, "South": true, "East": false, "West": false };
                previousTile.openPaths = { "North": true, "South": true, "East": false, "West": false };
                var levelMap = [previousTile];
                var secondTile = levelCreator.createSingleTile(previousTile, levelMap);
                expect(secondTile.position).toEqual({ x: 1, y: 2 });
                var thirdTile = levelCreator.createSingleTile(previousTile, levelMap);
                expect(thirdTile.position).toEqual({ x: 1, y: 0 });
            });
        });
        describe("new open paths can be created", function () {
            it("can create a tile with four paths", function () {
                jest.spyOn(global.Math, 'random').mockReturnValue(0.5);
                previousTile.position = { x: 0, y: 0 };
                previousTile.paths = { "North": false, "South": false, "East": false, "West": true };
                previousTile.openPaths = { "North": false, "South": false, "East": false, "West": true };
                var levelMap = [previousTile];
                var secondTile = levelCreator.createSingleTile(previousTile, levelMap);
                expect(secondTile.position).toEqual({ x: -1, y: 0 });
                expect(levelCreator.numberOpenPaths(secondTile)).toEqual(3);
            });
            it("can create a tile with one path", function () {
                jest.spyOn(global.Math, 'random').mockReturnValue(0.1);
                previousTile.position = { x: 0, y: 0 };
                previousTile.paths = { "North": false, "South": false, "East": false, "West": true };
                previousTile.openPaths = { "North": false, "South": false, "East": false, "West": true };
                var levelMap = [previousTile];
                var secondTile = levelCreator.createSingleTile(previousTile, levelMap);
                expect(secondTile.position).toEqual({ x: -1, y: 0 });
                expect(levelCreator.numberOpenPaths(secondTile)).toEqual(0);
            });
        });
    });
});
//# sourceMappingURL=createSingleTile.js.map