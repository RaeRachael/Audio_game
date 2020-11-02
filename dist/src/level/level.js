import { directionValues } from "../helpers/typesAndConst.js";
import { findCorrectTile } from "../helpers/helpers.js";
export class Level {
    constructor(levelMap) {
        this.levelMap = levelMap;
    }
    blockingDistance(location, testDirection, distance = 0) {
        var tile = findCorrectTile(this.levelMap, location);
        for (let direction in tile.paths) {
            if (testDirection === direction.toString()) {
                if (tile.paths[direction] === false) {
                    distance += 0.5;
                    if (tile.exitTile) {
                        distance *= -1;
                    }
                    console.log(tile, distance);
                    break;
                }
                else {
                    var nexLocation = {
                        x: location.x + directionValues[direction].x,
                        y: location.y + directionValues[direction].y
                    };
                    this.blockingDistance(nexLocation, testDirection, distance++);
                }
            }
        }
        return distance;
    }
}
//# sourceMappingURL=level.js.map