import { Level } from "../../src/level/level";
describe("function takes in a location and direction", function () {
    it("returns 0 if no path is in that direction", function () {
        var levelMap = [{
                "position": { "x": 0, "y": 0 },
                "paths": { "North": false, "South": false, "East": false, "West": false },
                "openPaths": { "North": false, "South": false, "East": false, "West": false },
                "exitTile": false
            }];
        var level = new Level(levelMap);
        expect(level.blockingDistance({ x: 0, y: 0 }, "North")).toEqual(0);
        expect(level.blockingDistance({ x: 0, y: 0 }, "South")).toEqual(0);
        expect(level.blockingDistance({ x: 0, y: 0 }, "East")).toEqual(0);
        expect(level.blockingDistance({ x: 0, y: 0 }, "West")).toEqual(0);
    });
    it("returns 1 if one path is in that direction", function () {
        var levelMap = [{
                "position": { "x": 0, "y": 0 },
                "paths": { "North": true, "South": false, "East": false, "West": false },
                "openPaths": { "North": false, "South": false, "East": false, "West": false },
                "exitTile": false
            },
            {
                "position": { "x": 0, "y": 1 },
                "paths": { "North": false, "South": true, "East": false, "West": false },
                "openPaths": { "North": false, "South": false, "East": false, "West": false },
                "exitTile": false
            }];
        var level = new Level(levelMap);
        expect(level.blockingDistance({ x: 0, y: 0 }, "North")).toEqual(1);
        expect(level.blockingDistance({ x: 0, y: 0 }, "South")).toEqual(0);
        expect(level.blockingDistance({ x: 0, y: 0 }, "East")).toEqual(0);
        expect(level.blockingDistance({ x: 0, y: 0 }, "West")).toEqual(0);
    });
});
//# sourceMappingURL=blockingDistance.js.map