import { directionValues } from "../helpers/typesAndConst.js";
import { findCorrectTile } from "../helpers/helpers.js";
export function blockingDistance(levelMap, location, testDirection, distance = 0) {
    var tile = findCorrectTile(levelMap, location);
    for (let direction in tile.paths) {
        if (testDirection === direction.toString()) {
            if (tile.paths[direction] === false) {
                break;
            }
            else {
                location.x += directionValues[direction].x;
                location.y += directionValues[direction].y;
                blockingDistance(levelMap, location, testDirection, distance++);
            }
        }
    }
    return distance;
}
//# sourceMappingURL=blockingdistance.js.map