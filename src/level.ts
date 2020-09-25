type Tile = {
  position: {x: number, y:number}
  paths: {"North": boolean, "South": boolean, "East": boolean, "West": boolean}
  openPaths: {"North": boolean, "South": boolean, "East": boolean, "West": boolean}
  numberOpenPaths: number
}

export function createLevel(number) {
  var i:number;
  var levelMap: Tile[] = [ {
    "position": {"x": 0, "y": 0},
    "paths": { "North": true, "South": false, "East": false, "West": false},
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
    "paths": { "North": true, "South": false, "East": false, "West": false},
    "openPaths": {"North": true, "South": false, "East": false, "West": false},
    "numberOpenPaths": 1
  }
  var openPathValue: { x:number, y:number } = {x: 0, y: 0}
  if (previousTile.openPaths.North) {
    openPathValue.y = 1
    previousTile.openPaths.North = false
  }
  else if (previousTile.openPaths.South) {
    openPathValue.y = -1
    previousTile.openPaths.South = false
  }
  else if (previousTile.openPaths.East) {
    openPathValue.x = 1
    previousTile.openPaths.East = false
  }
  else if (previousTile.openPaths.West) {
    openPathValue.x = -1
    previousTile.openPaths.west = false
  }
  // console.log(previousTile.position, openPathValue)
  singleTile.position.x = previousTile.position.x + openPathValue.x
  singleTile.position.y = previousTile.position.y + openPathValue.y
  singleTile.paths = { "North": true, "South": false, "East": false, "West": false}
  singleTile.openPaths = { "North": true, "South": false, "East": false, "West": false}

  previousTile.numberOpenPaths--

  return singleTile
}