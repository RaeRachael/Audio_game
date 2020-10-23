import { LevelCreator } from "../../src/level/levelCreator"

describe( "function checkForNearbyTiles(tile)", function() {
  describe( "changes tile properties if a tile is nearby", function() {
    it( "makes a path true if nearby tile connects to it", function() {
      var levelMap = [{
        "position": {"x": 0, "y": 0},
        "paths": { "North": true, "South": false, "East": false, "West": false},
        "openPaths": {"North": false, "South": false, "East": false, "West": false},
        "numberOpenPaths": 1,
        "exitTile": false
      }]
      var testTile = {
        "position": {"x": 0, "y": 1},
        "paths": { "North": false, "South": false, "East": true, "West": false},
        "openPaths": {"North": false, "South": false, "East": false, "West": false},
        "numberOpenPaths": 0,
        "exitTile": false
      }
      var levelCreator = new LevelCreator

      levelCreator.checkForNearbyTiles(testTile, levelMap)

      expect(testTile.paths.South).toEqual(true)
    })

    it( "makes a path false if nearby tile does not connect to it", function() {
      var levelMap = [{
        "position": {"x": 0, "y": 0},
        "paths": { "North": false, "South": false, "East": false, "West": false},
        "openPaths": {"North": false, "South": false, "East": false, "West": false},
        "numberOpenPaths": 1,
        "exitTile": false
      }]
      var testTile = {
        "position": {"x": 0, "y": 1},
        "paths": { "North": false, "South": true, "East": true, "West": false},
        "openPaths": {"North": false, "South": false, "East": false, "West": false},
        "numberOpenPaths": 0,
        "exitTile": false
      }

      var levelCreator = new LevelCreator

      levelCreator.checkForNearbyTiles(testTile, levelMap)

      expect(testTile.paths.South).toEqual(false)
    })
  })
})