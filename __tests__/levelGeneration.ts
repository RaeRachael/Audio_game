import { createLevel, createSingleTile } from "../src/level"

describe( "function createLevel()", function() {

  it( "creates an array the size of the argument squared", function() {
  
    expect(createLevel(1).length).toEqual(1)

    expect(createLevel(2).length).toEqual(4)

  })

  it( "creates tiles with postions and availiable paths", function() {
  
    expect(Number.isInteger(createLevel(1)[0].position.x)).toEqual(true)
    expect(Number.isInteger(createLevel(1)[0].position.x)).toEqual(true)

    expect( typeof createLevel(1)[0].paths.North === 'boolean').toBeTruthy()
    expect( typeof createLevel(1)[0].paths.South === 'boolean').toBeTruthy()
    expect( typeof createLevel(1)[0].paths.East === 'boolean').toBeTruthy()
    expect( typeof createLevel(1)[0].paths.West === 'boolean').toBeTruthy()

  })

  it( "the first tile is at '0,0' and has one availiable path", function() {

    var firstTile = createLevel(1)[0]
    var availiablePaths = 0
    if (firstTile.paths.North) availiablePaths++
    if (firstTile.paths.South) availiablePaths++
    if (firstTile.paths.East) availiablePaths++
    if (firstTile.paths.West) availiablePaths++

    expect(firstTile.position).toEqual({x: 0, y: 0})
    
    expect(availiablePaths).toEqual(1)
    
  })

  it( "the second tile is not at '0,0' ", function() {

    var secondTile = createLevel(2)[1]
    // var availiablePaths = 0
    // if (firstTile.paths.North) availiablePaths++
    // if (firstTile.paths.South) availiablePaths++
    // if (firstTile.paths.East) availiablePaths++
    // if (firstTile.paths.West) availiablePaths++

    expect(secondTile.position).not.toEqual({x: 0, y: 0})
    
    // expect(availiablePaths).toEqual(1)
    
  })

})

describe( "function create singleTile(previousTile)", function() {
  describe( "created tile is in the correct position based on the openPath", function() {

    it( "the second tile is at '0,1' if openPath is 'North'", function() {
      var previousTile = {
        "position": {"x": 0, "y": 0},
        "paths": { "North": true, "South": false, "East": false, "West": false},
        "openPaths": {"North": true, "South": false, "East": false, "West": false}
      }
      var secondTile = createSingleTile(previousTile)
  
      expect(secondTile.position).toEqual({x: 0, y: 1})
    })

    it( "the second tile is at '0,-1' if openPath is 'South'", function() {
      var previousTile = {
        "position": {"x": 0, "y": 0},
        "paths": { "North": true, "South": false, "East": false, "West": false},
        "openPaths": {"North": false, "South": true, "East": false, "West": false}
      }
      var secondTile = createSingleTile(previousTile)
  
      expect(secondTile.position).toEqual({x: 0, y: -1}) 
    })

    it( "the second tile is at '1,0' if openPath is 'East'", function() {
      var previousTile = {
        "position": {"x": 0, "y": 0},
        "paths": { "North": true, "South": false, "East": false, "West": false},
        "openPaths": {"North": false, "South": false, "East": true, "West": false}
      }
      var secondTile = createSingleTile(previousTile)
  
      expect(secondTile.position).toEqual({x: 1, y: 0}) 
    })

    it( "the second tile is at '-1,0' if openPath is 'West'", function() {
      var previousTile = {
        "position": {"x": 0, "y": 0},
        "paths": { "North": true, "South": false, "East": false, "West": false},
        "openPaths": {"North": false, "South": false, "East": false, "West": true}
      }
      var secondTile = createSingleTile(previousTile)

      expect(secondTile.position).toEqual({x: -1, y: 0})
    })

  })

})