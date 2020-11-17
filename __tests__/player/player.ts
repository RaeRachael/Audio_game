import { Audio } from "../../src/audio/audio"
import { Level } from "../../src/level/level"
import { Player } from "../../src/player/player"

jest.mock("../../src/audio/audio", () => ({
  Audio: jest.fn().mockImplementation(() => {
    return {
      audioSequence: jest.fn(),
      secondClickAudio: jest.fn(),
    }
  })
}));

var levelMap = [{
  "position": {"x": 0, "y": 0},
  "paths": { "North": false, "South": false, "East": false, "West": false},
  "openPaths": {"North": false, "South": false, "East": false, "West": false},
  "numberOpenPaths": 0,
  "exitTile": false
}]
var mockedlevel = new Level(levelMap)

var player = new Player
player.setLevel(mockedlevel)

player.addAudio(new Audio)

afterEach(() => {
  player.reset()
})

describe( "Player()", function() {
  it( "has '0,0' as a starting location", function () {
    expect(player.position).toEqual({x: 0, y: 0})
  })

  it("have north as a default direction", function () {
    expect(player.direction).toEqual("North")
  })

  describe("when unblocked", function() {
    it("have steps in the direction facing", function () {
      jest.spyOn(mockedlevel, 'blockingDistance').mockReturnValue(1);
      player.step()
      expect(player.position).toEqual({x: 0, y: 1})
    })

    it("have steps in the direction facing", function () {
      jest.spyOn(mockedlevel, 'blockingDistance').mockReturnValue(1);
      player.left()
      player.step()
      expect(player.position).toEqual({x: -1, y: 0})
    })

    it("have steps in the direction facing", function () {
      jest.spyOn(mockedlevel, 'blockingDistance').mockReturnValue(1);
      player.right()
      player.step()
      expect(player.position).toEqual({x: 1, y: 0})
    })
  })

  describe("when blocked", function() {
    it("does not step forward", function() {
      jest.spyOn(mockedlevel, 'blockingDistance').mockReturnValue(0);
      player.step()
      expect(player.position).toEqual({x: 0, y: 0})
    })
  })
})