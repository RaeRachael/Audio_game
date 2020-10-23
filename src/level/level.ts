import { Position, Tile, directionValues } from "../helpers/typesAndConst"
import { findCorrectTile } from "../helpers/helpers"

export class Level{
  levelMap: Tile[]

  constructor(levelMap: Tile[]) {
    this.levelMap = levelMap
  }

  blockingDistance(location: Position, testDirection: String, distance: number = 0){
    var tile = findCorrectTile(this.levelMap, location)
    for (let direction in tile.paths){
      if (testDirection === direction.toString()){
        if (tile.paths[direction] === false) {
          break
        } else {
          location.x += directionValues[direction].x
          location.y += directionValues[direction].y
          this.blockingDistance(location, testDirection, distance ++)
        }
      }
    }
    return distance
  }
}
