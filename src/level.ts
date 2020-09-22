export function createLevel(number) {
  var i:number;
  type Tile = {
    position: {x: number, y:number};
    paths: {"North": boolean, "South": boolean, "East": boolean, "West": boolean};
  }
  var levelMap: Tile[] = []

  for ( i = 0; i < number**2; i++ ) {
    levelMap.push({ "position": {"x": 1, "y": 1} , "paths": { "North": true, "South": false, "East": false, "West": false} })
  }
  return levelMap
}