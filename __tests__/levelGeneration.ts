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

})

describe( "function create singleTile(previousTile)", function() {

  var previousTile = {
    "position": {"x": 0, "y": 0},
    "paths": { "North": false, "South": false, "East": false, "West": false},
    "openPaths": {"North": false, "South": false, "East": false, "West": false},
    "numberOpenPaths": 1
  }
  
  describe( "created tile has correct position and return path based on the openPath", function() {

    describe( "Previous tile at '0,0'", function() {

      it( "the second tile is at '0,1' and path 'South' is true if openPath is 'North'", function() {
        previousTile.position = { x: 0, y: 0 }
        previousTile.openPaths = {"North": true, "South": false, "East": false, "West": false}
        var secondTile = createSingleTile(previousTile)
    
        expect(secondTile.position).toEqual({x: 0, y: 1})
        expect(secondTile.paths.South).toEqual(true)
      })

      it( "the second tile is at '0,-1' and path 'North' is true if openPath is 'South'", function() {
        previousTile.position = { x: 0, y: 0 }
        previousTile.openPaths = {"North": false, "South": true, "East": false, "West": false}
        var secondTile = createSingleTile(previousTile)
    
        expect(secondTile.position).toEqual({x: 0, y: -1})
        expect(secondTile.paths.North).toEqual(true)
      })

      it( "the second tile is at '1,0' and path 'West' if openPath is 'East'", function() {
        previousTile.position = { x: 0, y: 0 }
        previousTile.openPaths = {"North": false, "South": false, "East": true, "West": false}
        var secondTile = createSingleTile(previousTile)
    
        expect(secondTile.position).toEqual({x: 1, y: 0})
        expect(secondTile.paths.West).toEqual(true)
      })

      it( "the second tile is at '-1,0' and path 'East' if openPath is 'West'", function() {
        previousTile.position = { x: 0, y: 0 }
        previousTile.openPaths = {"North": false, "South": false, "East": false, "West": true}
        var secondTile = createSingleTile(previousTile)

        expect(secondTile.position).toEqual({x: -1, y: 0})
        expect(secondTile.paths.East).toEqual(true)
      })

    })

    describe( "Previous tile at '1,1'", function() {

      it( "the second tile is at '1,2' if openPath is 'North'", function() {
        previousTile.position = { x: 1, y: 1 }
        previousTile.openPaths = {"North": true, "South": false, "East": false, "West": false}
        var secondTile = createSingleTile(previousTile)
    
        expect(secondTile.position).toEqual({x: 1, y: 2})
      })

      it( "the second tile is at '1,0' if openPath is 'South'", function() {
        previousTile.position = { x: 1, y: 1 }
        previousTile.openPaths = {"North": false, "South": true, "East": false, "West": false}
        var secondTile = createSingleTile(previousTile)
    
        expect(secondTile.position).toEqual({x: 1, y: 0}) 
      })

      it( "the second tile is at '2,1' if openPath is 'East'", function() {
        previousTile.position = { x: 1, y: 1 }
        previousTile.openPaths = {"North": false, "South": false, "East": true, "West": false}
        var secondTile = createSingleTile(previousTile)
    
        expect(secondTile.position).toEqual({x: 2, y: 1}) 
      })

      it( "the second tile is at '0,1' if openPath is 'West'", function() {
        previousTile.position = { x: 1, y: 1 }
        previousTile.openPaths = {"North": false, "South": false, "East": false, "West": true}
        var secondTile = createSingleTile(previousTile)

        expect(secondTile.position).toEqual({x: 0, y: 1})
      })

      describe( "multiple open paths of a tile", function() {
        it( "the second tile is at '2,1', third is at '0,1', if openPaths are 'North, South'", function() {
          previousTile.position = { x: 1, y: 1 }
          previousTile.openPaths = {"North": true, "South": true, "East": false, "West": false}
          var secondTile = createSingleTile(previousTile)
  
          expect(secondTile.position).toEqual({x: 1, y: 2})

          var thirdTile = createSingleTile(previousTile)
  
          expect(thirdTile.position).toEqual({x: 1, y: 0})
        })
      })

    })

  })

})