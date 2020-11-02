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
          distance+= 0.5
          if (tile.exitTile) { distance *= -1 }
        } else {
          var nexLocation: Position= {
            x: location.x + directionValues[direction].x,
            y: location.y + directionValues[direction].y
          }
          distance = this.blockingDistance(nexLocation, testDirection, ++distance)
        }
      }
    }
    return distance
  }
}
