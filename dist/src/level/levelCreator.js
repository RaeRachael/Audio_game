import { directionValues } from "../helpers/typesAndConst.js";
import { Level } from "./level.js";
var i;
var j;
export class LevelCreator {
    constructor() {
        this.branchingValue = 0.5;
    }
    createLevel(number) {
        var levelMap = [{
                position: { "x": 0, "y": 0 },
                paths: { "North": true, "South": true, "East": false, "West": false },
                openPaths: { "North": true, "South": true, "East": false, "West": false },
                exitTile: false
            }];
        for (i = 0; i < number ** 2; i++) {
            if (i === levelMap.length - 1 && this.numberOpenPaths(levelMap[i]) === 0) {
                this.makeOneOpenPath(levelMap[i], levelMap);
            }
            while (this.numberOpenPaths(levelMap[i]) > 0) {
                levelMap.push(this.createSingleTile(levelMap[i], levelMap));
            }
        }
        return new Level(this.tidy(levelMap));
    }
    numberOpenPaths(tile) {
        var openPaths = 0;
        for (let direction in tile.openPaths) {
            if (tile.openPaths[direction]) {
                openPaths++;
            }
        }
        return openPaths;
    }
    makeOneOpenPath(tile, levelMap) {
        for (let direction in tile.openPaths) {
            tile.paths[direction] = true;
            tile.openPaths[direction] = true;
            for (j = 0; j < levelMap.length; j++) {
                if (levelMap[j].position.x === tile.position.x + directionValues[direction].x
                    && levelMap[j].position.y === tile.position.y + directionValues[direction].y) {
                    tile.paths[direction] = levelMap[j].paths[directionValues[direction].opposite];
                    tile.openPaths[direction] = false;
                }
            }
            if (tile.paths[direction] === true) {
                break;
            }
        }
    }
    createSingleTile(previousTile, levelMap) {
        var singleTile = {
            position: { "x": 0, "y": 0 },
            paths: { "North": false, "South": false, "East": false, "West": false },
            openPaths: { "North": false, "South": false, "East": false, "West": false },
            exitTile: false
        };
        var openPathValue = { x: 0, y: 0 };
        for (let direction in previousTile.openPaths) {
            if (previousTile.openPaths[direction]) {
                openPathValue.x = directionValues[direction].x;
                openPathValue.y = directionValues[direction].y;
                singleTile.paths[directionValues[direction].opposite] = true;
                previousTile.openPaths[direction] = false;
                break;
            }
        }
        singleTile.position.x = previousTile.position.x + openPathValue.x;
        singleTile.position.y = previousTile.position.y + openPathValue.y;
        this.checkForNearbyTiles(singleTile, levelMap);
        return singleTile;
    }
    checkForNearbyTiles(tile, levelMap) {
        for (let direction in tile.openPaths) {
            var freeDirection = true;
            for (j = 0; j < levelMap.length; j++) {
                if (levelMap[j].position.x === tile.position.x + directionValues[direction].x
                    && levelMap[j].position.y === tile.position.y + directionValues[direction].y) {
                    freeDirection = false;
                    tile.paths[direction] = levelMap[j].paths[directionValues[direction].opposite];
                    if (levelMap[j].openPaths[directionValues[direction].opposite]) {
                        levelMap[j].openPaths[directionValues[direction].opposite] = false;
                    }
                }
            }
            if (freeDirection) {
                this.createOpenPath(tile, direction);
            }
        }
    }
    createOpenPath(tile, direction) {
        if (Math.random() > this.branchingValue) {
            tile.paths[direction] = true;
            tile.openPaths[direction] = true;
        }
    }
    tidy(levelMap) {
        for (i = 0; i < levelMap.length; i++) {
            for (let direction in levelMap[i].paths) {
                if (levelMap[i].openPaths[direction] === true) {
                    levelMap[i].paths[direction] = false;
                    levelMap[i].openPaths[direction] = false;
                }
            }
        }
        levelMap[levelMap.length - 1].exitTile = true;
        return levelMap;
    }
}
//# sourceMappingURL=levelCreator.js.map