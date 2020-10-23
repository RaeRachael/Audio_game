export type Position = {x: number, y: number}

export type Directions = {"North": boolean, "South": boolean, "East": boolean, "West": boolean}

export type Tile = {
  position: Position
  paths: Directions
  openPaths: Directions
  numberOpenPaths: number
  exitTile: boolean
}

export type DirectionValues = {
  North: {x: number, y: number, "opposite":string, left: string, right: string},
  South: {x: number, y: number, "opposite":string, left: string, right: string},
  East: {x: number, y: number, "opposite":string, left: string, right: string},
  West: {x: number, y: number, "opposite":string, left: string, right: string}
}

export const directionValues:DirectionValues = { 
  North: {x: 0, y: 1, opposite: "South", left: "West", right: "East"},
  South: {x: 0, y: -1, opposite: "North", left: "East", right: "West"},
  East: {x: 1, y: 0, opposite: "West", left: "North", right: "South"},
  West: {x: -1, y: 0, opposite: "East", left: "South", right: "North"}
}
