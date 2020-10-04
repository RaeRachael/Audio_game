import { checkForNearbyTiles, createLevel, createSingleTile } from "../src/level"

beforeEach(() => {
  jest.spyOn(global.Math, 'random').mockReturnValue(0.123456789);
});

afterEach(() => {
  jest.spyOn(global.Math, 'random').mockRestore();
})

describe( "function createLevel()", function() {

  it( "creates an array the size of the argument squared or greater", function() {
  
    expect(createLevel(1).length).toBeGreaterThan(0)

    expect(createLevel(2).length).toBeGreaterThan(3)

  })

  it( "creates tiles with postions and availiable paths", function() {
  
    expect(Number.isInteger(createLevel(1)[0].position.x)).toEqual(true)
    expect(Number.isInteger(createLevel(1)[0].position.x)).toEqual(true)

    expect( typeof createLevel(1)[0].paths.North === 'boolean').toBeTruthy()
    expect( typeof createLevel(1)[0].paths.South === 'boolean').toBeTruthy()
    expect( typeof createLevel(1)[0].paths.East === 'boolean').toBeTruthy()
    expect( typeof createLevel(1)[0].paths.West === 'boolean').toBeTruthy()

  })

  it( "the first tile is at '0,0' and has two availiable path", function() {

    var firstTile = createLevel(1)[0]
    var availiablePaths = 0
    if (firstTile.paths.North) availiablePaths++
    if (firstTile.paths.South) availiablePaths++
    if (firstTile.paths.East) availiablePaths++
    if (firstTile.paths.West) availiablePaths++

    expect(firstTile.position).toEqual({x: 0, y: 0})
    
    expect(availiablePaths).toEqual(2)
    
  })

  it( "builds tiles from the nearest open path", function() {
    var levelMap = createLevel(2)
    expect(levelMap[1].position).toEqual({x: 0, y: 1})
    expect(levelMap[2].position).toEqual({x: 0, y: -1})
  })

})

describe( "function createSingleTile(previousTile)", function() {

  var previousTile = {
    "position": {"x": 0, "y": 0},
    "paths": { "North": false, "South": false, "East": false, "West": false},
    "openPaths": {"North": false, "South": false, "East": false, "West": false},
    "numberOpenPaths": 1
  }
  var levelMap = [previousTile]
  
  describe( "created tile has correct position and return path based on the openPath", function() {

    describe( "Previous tile at '0,0'", function() {

      it( "the second tile is at '0,1' and path 'South' is true if openPath is 'North'", function() {
        previousTile.position = { x: 0, y: 0 }
        previousTile.paths = {"North": true, "South": false, "East": false, "West": false}
        previousTile.openPaths = {"North": true, "South": false, "East": false, "West": false}
        var levelMap = [previousTile]
        var secondTile = createSingleTile(previousTile, levelMap)
    
        expect(secondTile.position).toEqual({x: 0, y: 1})
        expect(secondTile.paths.South).toEqual(true)
      })

      it( "the second tile is at '0,-1' and path 'North' is true if openPath is 'South'", function() {
        previousTile.position = { x: 0, y: 0 }
        previousTile.paths = {"North": false, "South": true, "East": false, "West": false}
        previousTile.openPaths = {"North": false, "South": true, "East": false, "West": false}
        var levelMap = [previousTile]
        var secondTile = createSingleTile(previousTile, levelMap)
    
        expect(secondTile.position).toEqual({x: 0, y: -1})
        expect(secondTile.paths.North).toEqual(true)
      })

      it( "the second tile is at '1,0' and path 'West' if openPath is 'East'", function() {
        previousTile.position = { x: 0, y: 0 }
        previousTile.paths = {"North": false, "South": false, "East": true, "West": false}
        previousTile.openPaths = {"North": false, "South": false, "East": true, "West": false}
        var levelMap = [previousTile]
        var secondTile = createSingleTile(previousTile, levelMap)
    
        expect(secondTile.position).toEqual({x: 1, y: 0})
        expect(secondTile.paths.West).toEqual(true)
      })

      it( "the second tile is at '-1,0' and path 'East' if openPath is 'West'", function() {
        previousTile.position = { x: 0, y: 0 }
        previousTile.paths = {"North": false, "South": false, "East": false, "West": true}
        previousTile.openPaths = {"North": false, "South": false, "East": false, "West": true}
        var levelMap = [previousTile]
        var secondTile = createSingleTile(previousTile, levelMap)

        expect(secondTile.position).toEqual({x: -1, y: 0})
        expect(secondTile.paths.East).toEqual(true)
      })
    })

    describe( "Previous tile at '1,1'", function() {

      it( "the second tile is at '1,2' if openPath is 'North'", function() {
        previousTile.position = { x: 1, y: 1 }
        previousTile.paths = {"North": true, "South": false, "East": false, "West": false}
        previousTile.openPaths = {"North": true, "South": false, "East": false, "West": false}
        var levelMap = [previousTile]
        var secondTile = createSingleTile(previousTile, levelMap)
    
        expect(secondTile.position).toEqual({x: 1, y: 2})
      })

      it( "the second tile is at '1,0' if openPath is 'South'", function() {
        previousTile.position = { x: 1, y: 1 }
        previousTile.paths = {"North": false, "South": true, "East": false, "West": false}
        previousTile.openPaths = {"North": false, "South": true, "East": false, "West": false}
        var levelMap = [previousTile]
        var secondTile = createSingleTile(previousTile, levelMap)
    
        expect(secondTile.position).toEqual({x: 1, y: 0}) 
      })

      it( "the second tile is at '2,1' if openPath is 'East'", function() {
        previousTile.position = { x: 1, y: 1 }
        previousTile.paths = {"North": false, "South": false, "East": true, "West": false}
        previousTile.openPaths = {"North": false, "South": false, "East": true, "West": false}
        var levelMap = [previousTile]
        var secondTile = createSingleTile(previousTile, levelMap)
    
        expect(secondTile.position).toEqual({x: 2, y: 1}) 
      })

      it( "the second tile is at '0,1' if openPath is 'West'", function() {
        previousTile.position = { x: 1, y: 1 }
        previousTile.paths = {"North": false, "South": false, "East": false, "West": true}
        previousTile.openPaths = {"North": false, "South": false, "East": false, "West": true}
        var levelMap = [previousTile]
        var secondTile = createSingleTile(previousTile, levelMap)

        expect(secondTile.position).toEqual({x: 0, y: 1})
      })

      describe( "multiple open paths of a tile", function() {
        it( "the second tile is at '2,1', third is at '0,1', if openPaths are 'North, South'", function() {
          previousTile.position = { x: 1, y: 1 }
          previousTile.paths = {"North": true, "South": true, "East": false, "West": false}
          previousTile.openPaths = {"North": true, "South": true, "East": false, "West": false}
          var levelMap = [previousTile]
          var secondTile = createSingleTile(previousTile, levelMap)
  
          expect(secondTile.position).toEqual({x: 1, y: 2})

          var thirdTile = createSingleTile(previousTile, levelMap)
  
          expect(thirdTile.position).toEqual({x: 1, y: 0})
        })
      })
    })

    describe( "new open paths can be created", function() {
      it( "can create a tile with four paths", function() {
        jest.spyOn(global.Math, 'random').mockReturnValue(0.5);

        previousTile.position = { x: 0, y: 0 }
        previousTile.paths = {"North": false, "South": false, "East": false, "West": true}
        previousTile.openPaths = {"North": false, "South": false, "East": false, "West": true}
        var levelMap = [previousTile]
        var secondTile = createSingleTile(previousTile, levelMap)

        expect(secondTile.position).toEqual({x: -1, y: 0})
        expect(secondTile.numberOpenPaths).toEqual(3)
      })
    })
  })
})

describe( "function checkForNearbyTiles(tile)", function() {
  describe( "changes tile properties if a tile is nearby", function() {
    it( "makes a path true if nearby tile connects to it", function() {
      var levelMap = [{
        "position": {"x": 0, "y": 0},
        "paths": { "North": true, "South": false, "East": false, "West": false},
        "openPaths": {"North": false, "South": false, "East": false, "West": false},
        "numberOpenPaths": 1
      }]
      var testTile = {
        "position": {"x": 0, "y": 1},
        "paths": { "North": false, "South": false, "East": true, "West": false},
        "openPaths": {"North": false, "South": false, "East": false, "West": false},
        "numberOpenPaths": 0
      }

      checkForNearbyTiles(testTile, levelMap)

      expect(testTile.paths.South).toEqual(true)
    })

    it( "makes a path false if nearby tile does not connect to it", function() {
      var levelMap = [{
        "position": {"x": 0, "y": 0},
        "paths": { "North": false, "South": false, "East": false, "West": false},
        "openPaths": {"North": false, "South": false, "East": false, "West": false},
        "numberOpenPaths": 1
      }]
      var testTile = {
        "position": {"x": 0, "y": 1},
        "paths": { "North": false, "South": true, "East": true, "West": false},
        "openPaths": {"North": false, "South": false, "East": false, "West": false},
        "numberOpenPaths": 0
      }

      checkForNearbyTiles(testTile, levelMap)

      expect(testTile.paths.South).toEqual(false)
    })
  })
})