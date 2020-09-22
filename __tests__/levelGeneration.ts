import { createLevel } from "../src/level"

describe( "function createLevel()", function() {

  it( "creates an array the size of the argument squared", function() {
  
    expect(createLevel(1).length).toEqual(1)

    expect(createLevel(2).length).toEqual(4)

  })

})