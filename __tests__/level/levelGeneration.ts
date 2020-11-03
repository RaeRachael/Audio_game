import { LevelCreator } from "../../src/level/levelCreator"

beforeEach(() => {
  jest.spyOn(global.Math, 'random').mockReturnValueOnce(0.8);
});

afterEach(() => {
  jest.spyOn(global.Math, 'random').mockRestore();
})

describe( "function createLevel()", function() {

  var levelCreator = new LevelCreator

  it( "creates an array the size of the argument squared or greater", function() {
  
    expect(levelCreator.createLevel(1).levelMap.length).toBeGreaterThan(0)

    expect(levelCreator.createLevel(2).levelMap.length).toBeGreaterThan(3)

  })

  it( "creates tiles with postions and availiable paths", function() {
    var level = levelCreator.createLevel(1)
  
    expect(Number.isInteger(level.levelMap[0].position.x)).toEqual(true)
    expect(Number.isInteger(level.levelMap[0].position.x)).toEqual(true)

    expect( typeof level.levelMap[0].paths.North === 'boolean').toBeTruthy()
    expect( typeof level.levelMap[0].paths.South === 'boolean').toBeTruthy()
    expect( typeof level.levelMap[0].paths.East === 'boolean').toBeTruthy()
    expect( typeof level.levelMap[0].paths.West === 'boolean').toBeTruthy()

  })

  it( "the first tile is at '0,0' and has two availiable path", function() {

    var firstTile = levelCreator.createLevel(2).levelMap[0]
    var availiablePaths = 0
    if (firstTile.paths.North) availiablePaths++
    if (firstTile.paths.South) availiablePaths++
    if (firstTile.paths.East) availiablePaths++
    if (firstTile.paths.West) availiablePaths++

    expect(firstTile.position).toEqual({x: 0, y: 0})
    
    expect(availiablePaths).toEqual(2)
    
  })

  it( "builds tiles from the nearest open path", function() {
    var levelMap = levelCreator.createLevel(2).levelMap
    expect(levelMap[1].position).toEqual({x: 0, y: 1})
    expect(levelMap[2].position).toEqual({x: 0, y: -1})
  })

  it( "closes all open paths at the end", function() {
    var levelMap = levelCreator.createLevel(2).levelMap
    for( var i = 0; i < levelMap.length; i++) {
      expect(levelCreator.numberOpenPaths(levelMap[i])).toEqual(0)
    }
  })

  it( "labels the last tile as the exitTile", function() {
    var levelMap = levelCreator.createLevel(2).levelMap
    expect(levelMap[levelMap.length-1].exitTile).toEqual(true)
  })

  it( "adds a new OpenPath when needed", function() {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.1);

    var levelMap = levelCreator.createLevel(4).levelMap
    expect(levelMap.length).toEqual(16)

  })

})