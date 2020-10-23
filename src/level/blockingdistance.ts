type Position = {x: number, y: number}
type Directions = {"North": boolean, "South": boolean, "East": boolean, "West": boolean}
type Tile = {
  position: Position
  paths: Directions
  openPaths: Directions
  numberOpenPaths: number
  exitTile: boolean
}

type DirectionValues = {
  North: {x: number, y: number, "opposite":string, left: string, right: string},
  South: {x: number, y: number, "opposite":string, left: string, right: string},
  East: {x: number, y: number, "opposite":string, left: string, right: string},
  West: {x: number, y: number, "opposite":string, left: string, right: string}
}

const directionValues:DirectionValues = { 
  North: {x: 0, y: 1, opposite: "South", left: "West", right: "East"},
  South: {x: 0, y: -1, opposite: "North", left: "East", right: "West"},
  East: {x: 1, y: 0, opposite: "West", left: "North", right: "South"},
  West: {x: -1, y: 0, opposite: "East", left: "South", right: "North"}
}

export function blockingDistance(levelMap: Tile[], location: Position, testDirection: String, distance: number = 0){
  levelMap.forEach(function(tile) {
    if (tile.position.x == location.x && tile.position.y == location.y) {
      for (let direction in tile.paths){
        if (testDirection === direction.toString())
        if (tile.paths[direction] === false) {
          break
        } else {
          location.x += directionValues[direction].x
          location.y += directionValues[direction].y
          blockingDistance(levelMap, location, testDirection, distance ++)
        }
      }
    }
  })
  return distance
}