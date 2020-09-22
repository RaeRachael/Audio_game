import { createLevel } from "../src/level"

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

})