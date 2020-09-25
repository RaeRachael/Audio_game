type Position = {x: number, y: number}
type Tile = {
  position: Position
  paths: {"North": boolean, "South": boolean, "East": boolean, "West": boolean}
  openPaths: {"North": boolean, "South": boolean, "East": boolean, "West": boolean}
  numberOpenPaths: number
}
type DirectionValues = {
  "North": {x: number, y: number, "opposite":string},
  "South": {x: number, y: number, "opposite":string},
  "East": {x: number, y: number, "opposite":string},
  "West": {x: number, y: number, "opposite":string}
}

const directionValues:DirectionValues = { 
  "North": {x: 0, y: 1, opposite: "South"},
  "South": {x: 0, y: -1, opposite: "North"},
  "East": {x: 1, y: 0, opposite: "West"},
  "West": {x: -1, y: 0, opposite: "East"}
}

var i:number;

export function createLevel(number) {
  var levelMap: Tile[] = [ {
    position: {"x": 0, "y": 0},
    paths: {"North": true, "South": false, "East": false, "West": false},
    openPaths: {"North": true, "South": false, "East": false, "West": false},
    numberOpenPaths: 1
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
      singleTile.paths[directionValues[direction].opposite] = true
       
      previousTile.openPaths[direction] = false
      previousTile.numberOpenPaths--
     
      break
    }
  }

  singleTile.position.x = previousTile.position.x + openPathValue.x
  singleTile.position.y = previousTile.position.y + openPathValue.y
  // singleTile.paths = {"North": true, "South": false, "East": false, "West": false}
  singleTile.openPaths = {"North": true, "South": false, "East": false, "West": false}

  return singleTile
}