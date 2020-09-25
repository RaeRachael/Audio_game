type Position = {x: number, y: number}
type Tile = {
  position: Position
  paths: {"North": boolean, "South": boolean, "East": boolean, "West": boolean}
  openPaths: {"North": boolean, "South": boolean, "East": boolean, "West": boolean}
  numberOpenPaths: number
}
type DirectionValues = {"North": Position, "South": Position, "East": Position, "West": Position}

const directionValues:DirectionValues = { 
  "North": {x: 0, y: 1}, "South": {x: 0, y: -1}, "East": {x: 1, y: 0}, "West": {x: -1, y: 0} 
}

var i:number;

export function createLevel(number) {
  var levelMap: Tile[] = [ {
    "position": {"x": 0, "y": 0},
    "paths": {"North": true, "South": false, "East": false, "West": false},
    "openPaths": {"North": true, "South": false, "East": false, "West": false},
    "numberOpenPaths": 1
  } ]
  for ( i = 0; i < number**2 - 1; i++ ) {
    levelMap.push(createSingleTile(levelMap[i]))
  }
  // console.log(levelMap)
  return levelMap
}

export function createSingleTile(previousTile) {
  var singleTile:Tile = {
    "position": {"x": 0, "y": 0},
    "paths": {"North": true, "South": false, "East": false, "West": false},
    "openPaths": {"North": true, "South": false, "East": false, "West": false},
    "numberOpenPaths": 1
  }
  var openPathValue: { x:number, y:number } = {x: 0, y: 0}

  for (let direction in previousTile.openPaths) {
    if (previousTile.openPaths[direction]) {
      openPathValue.x = directionValues[direction].x
      openPathValue.y = directionValues[direction].y
      previousTile.openPaths[direction] = false
      break
    }
  }
  
  singleTile.position.x = previousTile.position.x + openPathValue.x
  singleTile.position.y = previousTile.position.y + openPathValue.y
  singleTile.paths = {"North": true, "South": false, "East": false, "West": false}
  singleTile.openPaths = {"North": true, "South": false, "East": false, "West": false}

  previousTile.numberOpenPaths--

  return singleTile
}