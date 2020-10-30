import { directionValues } from "../helpers/typesAndConst";
import { findCorrectTile } from "../helpers/helpers";
export class Level {
    constructor(levelMap) {
        this.levelMap = levelMap;
    }
    blockingDistance(location, testDirection, distance = 0) {
        var tile = findCorrectTile(this.levelMap, location);
        for (let direction in tile.paths) {
            if (testDirection === direction.toString()) {
                if (tile.paths[direction] === false) {
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
        return (distance + 0.5);
    }
}
//# sourceMappingURL=level.js.map