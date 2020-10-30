import { directionValues } from "./typesAndConst";
export function findCorrectTile(levelMap, location) {
    var output;
    levelMap.forEach(function (tile) {
        if (tile.position.x == location.x && tile.position.y == location.y) {
            output = tile;
        }
    });
    return output;
}
export function tileExistsAt(levelMap, location) {
    var test = findCorrectTile(levelMap, location);
    return (!!test);
}
export function tileExistsAtOffset(levelMap, location, givenDirection) {
    for (let direction in directionValues) {
        if (givenDirection === direction.toString()) {
            location.x += directionValues[direction].x;
            location.y += directionValues[direction].y;
        }
    }
    return tileExistsAt(levelMap, location);
}
//# sourceMappingURL=helpers.js.map