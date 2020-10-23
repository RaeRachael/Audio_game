import { Position, Tile, directionValues } from "../helpers/typesAndConst"
import { findCorrectTile } from "../helpers/helpers"


export function blockingDistance(levelMap: Tile[], location: Position, testDirection: String, distance: number = 0){
  var tile = findCorrectTile(levelMap, location)
  for (let direction in tile.paths){
    if (testDirection === direction.toString()){
      if (tile.paths[direction] === false) {
        break
      } else {
        location.x += directionValues[direction].x
        location.y += directionValues[direction].y
        blockingDistance(levelMap, location, testDirection, distance ++)
      }
    }
  }
  return distance
}
