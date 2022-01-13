type Point = [ x: number, y: number, r?: number ]
type Polygon = {
  0: Point
  1: Point
  2: Point
} & Array<Point>

export function path (points: Polygon, radius?: number): string
