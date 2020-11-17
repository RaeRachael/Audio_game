import { Input } from "../../src/input/input"
import { displayText } from "../../src/main";
import { Player } from "../../src/player/player"

jest.mock("../../src/player/player", () => ({
 Player: jest.fn().mockImplementation(() => {
    return {
      step: jest.fn(),
      left: jest.fn(),
      right: jest.fn(),
      firstSound: jest.fn(),
    }
  })
}));
jest.mock("../../src/main", () => ({ displayText: jest.fn() }) )

describe ("Input responses", function() {

  describe("A new input isn't active (in play)", function() {
    var mockedPlayer = new Player
    var input = new Input(mockedPlayer)

    expect(input.active).toEqual(false)
  })

  describe("when in play", function() {
    describe ("keyPress - step forward", function() {
      it( "calls player.step", function() {
        var mockedPlayer = new Player
        var input = new Input(mockedPlayer)
        input.active = true

        var key = "ArrowUp"
        input.keyResponse(key)
        expect(input.player.step).toBeCalledTimes(1)
      })
    })
  
    describe ("keyPress - turn left", function() {
      it( "calls player.left", function() {
        var mockedPlayer = new Player 
        var input = new Input(mockedPlayer)
        input.active = true
  
        var key = "ArrowLeft"
        input.keyResponse(key)
        expect(input.player.left).toBeCalledTimes(1)
      })
    })
  
    describe ("keyPress - turn right", function() {
      it( "calls player.right", function() {
        var mockedPlayer = new Player 
        var input = new Input(mockedPlayer)
        input.active = true
  
        var key = "ArrowRight"
        input.keyResponse(key)
        expect(input.player.right).toBeCalledTimes(1)
      })
    })

    describe ("keyPress - turn right", function() {
      it( "calls player.right", function() {
        var mockedPlayer = new Player 
        var input = new Input(mockedPlayer)
        input.active = true
  
        var key = "ArrowRight"
        input.keyResponse(key)
        expect(input.player.right).toBeCalledTimes(1)
      })
    })

    describe ("keyPress - ' ' ", function() {
      it( "does not call 'display text' or player.firstSound", function() {
        var mockedPlayer = new Player 
        var input = new Input(mockedPlayer)
        input.active = true
  
        var key = " "
        input.keyResponse(key)
        expect(input.player.firstSound).toBeCalledTimes(0)
        expect(displayText).toBeCalledTimes(0)
      })
    })
  })
  
  describe("when not in play", function() {
    describe ("keyPress - step forward", function() {
      it( "does not call player.step", function() {
        var mockedPlayer = new Player
        var input = new Input(mockedPlayer)
  
        var key = "ArrowUp"
        input.keyResponse(key)
        expect(input.player.step).toBeCalledTimes(0)
      })
    })
  
    describe ("keyPress - turn left", function() {
      it( "does not call player.left", function() {
        var mockedPlayer = new Player 
        var input = new Input(mockedPlayer)
  
        var key = "ArrowLeft"
        input.keyResponse(key)
        expect(input.player.left).toBeCalledTimes(0)
      })
    })
  
    describe ("keyPress - turn right", function() {
      it( "does not call player.right", function() {
        var mockedPlayer = new Player 
        var input = new Input(mockedPlayer)
  
        var key = "ArrowRight"
        input.keyResponse(key)
        expect(input.player.right).toBeCalledTimes(0)
      })
    })

    describe ("keyPress - ' ' ", function() {
      it( "calls 'display text' or player.firstSound", function() {
        var mockedPlayer = new Player 
        var input = new Input(mockedPlayer)
  
        var key = " "
        input.keyResponse(key)
        expect(input.player.firstSound).toBeCalledTimes(1)
        expect(displayText).toBeCalledTimes(1)
      })
    })
  })
})