"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOpenPaths = exports.checkForNearbyTiles = exports.createSingleTile = exports.createLevel = void 0;
var directionValues = {
    North: { x: 0, y: 1, opposite: "South" },
    South: { x: 0, y: -1, opposite: "North" },
    East: { x: 1, y: 0, opposite: "West" },
    West: { x: -1, y: 0, opposite: "East" }
};
var i;
var j;
function createLevel(number) {
    var levelMap = [{
            position: { "x": 0, "y": 0 },
            paths: { "North": true, "South": true, "East": false, "West": false },
            openPaths: { "North": true, "South": true, "East": false, "West": false },
            numberOpenPaths: 2,
            exitTile: false
        }];
    for (i = 0; i < Math.pow(number, 2) - 1; i++) {
        if (i === levelMap.length - 1 && levelMap[i].numberOpenPaths === 0) {
            makeOneOpenPath(levelMap[i], levelMap);
        }
        while (levelMap[i].numberOpenPaths > 0) {
            levelMap.push(createSingleTile(levelMap[i], levelMap));
        }
    }
    return tidy(levelMap);
}
exports.createLevel = createLevel;
function makeOneOpenPath(tile, levelMap) {
    for (var direction in tile.openPaths) {
        tile.paths[direction] = true;
        tile.openPaths[direction] = true;
        for (j = 0; j < levelMap.length; j++) {
            if (levelMap[j].position.x + directionValues[direction].x === tile.position.x
                && levelMap[j].position.y + directionValues[direction].y === tile.position.y) {
                tile.paths[direction] = false;
                tile.openPaths[direction] = false;
            }
        }
        if (tile.paths[direction] === true) {
            tile.numberOpenPaths++;
            break;
        }
    }
}
function createSingleTile(previousTile, levelMap) {
    var singleTile = {
        position: { "x": 0, "y": 0 },
        paths: { "North": false, "South": false, "East": false, "West": false },
        openPaths: { "North": false, "South": false, "East": false, "West": false },
        numberOpenPaths: 0,
        exitTile: false
    };
    var openPathValue = { x: 0, y: 0 };
    for (var direction in previousTile.openPaths) {
        if (previousTile.openPaths[direction]) {
            openPathValue.x = directionValues[direction].x;
            openPathValue.y = directionValues[direction].y;
            singleTile.paths[directionValues[direction].opposite] = true;
            previousTile.openPaths[direction] = false;
            previousTile.numberOpenPaths--;
            break;
        }
    }
    singleTile.position.x = previousTile.position.x + openPathValue.x;
    singleTile.position.y = previousTile.position.y + openPathValue.y;
    checkForNearbyTiles(singleTile, levelMap);
    createOpenPaths(singleTile);
    return singleTile;
}
exports.createSingleTile = createSingleTile;
function checkForNearbyTiles(tile, levelMap) {
    for (var direction in tile.openPaths) {
        for (j = 0; j < levelMap.length; j++) {
            if (levelMap[j].position.x + directionValues[direction].x === tile.position.x
                && levelMap[j].position.y + directionValues[direction].y === tile.position.y) {
                tile.paths[directionValues[direction].opposite] = levelMap[j].paths[direction];
            }
        }
    }
}
exports.checkForNearbyTiles = checkForNearbyTiles;
function createOpenPaths(tile) {
    for (var direction in tile.paths) {
        if (tile.paths[direction] === false && Math.random() > 0.2) {
            tile.paths[direction] = true;
            tile.openPaths[direction] = true;
            tile.numberOpenPaths++;
        }
    }
}
exports.createOpenPaths = createOpenPaths;
function tidy(levelMap) {
    for (i = 0; i < levelMap.length; i++) {
        for (var direction in levelMap[i].paths) {
            if (levelMap[i].openPaths[direction] === true) {
                levelMap[i].paths[direction] = false;
                levelMap[i].openPaths[direction] = false;
                levelMap[i].numberOpenPaths--;
            }
        }
    }
    levelMap[levelMap.length - 1].exitTile = true;
    return levelMap;
}
//# sourceMappingURL=level.js.map