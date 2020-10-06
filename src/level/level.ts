type Position = {x: number, y: number}
type Tile = {
  position: Position
  paths: {"North": boolean, "South": boolean, "East": boolean, "West": boolean}
  openPaths: {"North": boolean, "South": boolean, "East": boolean, "West": boolean}
  numberOpenPaths: number
  exitTile: boolean
}
type DirectionValues = {
  North: {x: number, y: number, "opposite":string},
  South: {x: number, y: number, "opposite":string},
  East: {x: number, y: number, "opposite":string},
  West: {x: number, y: number, "opposite":string}
}

const directionValues:DirectionValues = { 
  North: {x: 0, y: 1, opposite: "South"},
  South: {x: 0, y: -1, opposite: "North"},
  East: {x: 1, y: 0, opposite: "West"},
  West: {x: -1, y: 0, opposite: "East"}
}

var i:number;
var j:number;

export function createLevel(number) {
  var levelMap: Tile[] = [ {
    position: {"x": 0, "y": 0},
    paths: {"North": true, "South": true, "East": false, "West": false},
    openPaths: {"North": true, "South": true, "East": false, "West": false},
    numberOpenPaths: 2,
    exitTile: false
  } ]
  for ( i = 0; i < number**2 - 1; i++ ) {
    while (levelMap[i].numberOpenPaths > 0 ) {
      levelMap.push(createSingleTile(levelMap[i], levelMap))
    }
  }
  return tidy(levelMap)
}

export function createSingleTile(previousTile:Tile, levelMap:Tile[]) {
  var singleTile:Tile = {
    position: {"x": 0, "y": 0},
    paths: {"North": false, "South": false, "East": false, "West": false},
    openPaths: {"North": false, "South": false, "East": false, "West": false},
    numberOpenPaths: 0,
    exitTile: false
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

  checkForNearbyTiles(singleTile, levelMap)
  
  createOpenPaths(singleTile)

  return singleTile
}

export function checkForNearbyTiles(tile:Tile, levelMap:Tile[]) {
  for ( j = 0; j < levelMap.length; j++ ) {
    if (levelMap[j].position.x === tile.position.x && levelMap[j].position.y + 1 === tile.position.y) {
      tile.paths.South = levelMap[j].paths.North
    }
    if (levelMap[j].position.x == tile.position.x && levelMap[j].position.y -1 == tile.position.y) {
      tile.paths.North = levelMap[j].paths.South
    }
    if (levelMap[j].position.x + 1 == tile.position.x && levelMap[j].position.y == tile.position.y) {
      tile.paths.West = levelMap[j].paths.East
    }
    if (levelMap[j].position.x - 1 == tile.position.x && levelMap[j].position.y == tile.position.y) {
      tile.paths.East = levelMap[j].paths.West
    }
  }
}

export function createOpenPaths(tile:Tile) {
  for( let direction in tile.paths) {
    if (tile.paths[direction] === false && Math.random() > 0.2){
      tile.paths[direction] = true
      tile.openPaths[direction] = true
      tile.numberOpenPaths ++
    }
  }
}

function tidy(levelMap:Tile[]) {
  for ( i = 0; i < levelMap.length; i++ ) {
    for( let direction in levelMap[i].paths) {
      if (levelMap[i].openPaths[direction] === true){
        levelMap[i].paths[direction] = false
        levelMap[i].openPaths[direction] = false
        levelMap[i].numberOpenPaths --
      }
    }
  }
  levelMap[levelMap.length-1].exitTile = true
  return levelMap
}