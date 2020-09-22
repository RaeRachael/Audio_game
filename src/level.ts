export function createLevel(number) {
  var i:number;
  type Tile = {
    position: {x: number, y:number};
    paths: {"North": boolean, "south": boolean, "East": boolean, "West": boolean};
  }
  var levelMap: Tile[]

  for ( i = 0; i < number**2; i++ ) {
    levelMap.push({ "position": {"x": 1, "y": 1} , "paths": { "North": false, "south": false, "East": false, "West": false} })
  }
  console.log(levelMap)
  return levelMap
}