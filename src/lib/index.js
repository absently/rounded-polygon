import { eachCons, round } from './utils'

function normalize (angle) {
  return Math.atan2(Math.sin(angle), Math.cos(angle))
}

// https://pomax.github.io/bezierinfo/
function kappa (angle) {
  return (4 / 3) * Math.tan((Math.PI - normalize(angle)) / 4)
}

function vector (s, e) {
  const dx = s[0] - e[0]
  const dy = s[1] - e[1]

  return { origin: s, angle: Math.atan2(dy, dx) }
}

function angleBetween (v1, v2) {
  let angle = normalize(v1.angle - v2.angle)

  if (angle < 0) {
    angle = normalize(v2.angle - v1.angle)
  }

  return angle
}

function curve (v, len, r, k) {
  const { origin, angle } = v
  const sin = Math.sin(angle)
  const cos = Math.cos(angle)
  const p = [ origin[0] - len * cos, origin[1] - len * sin ]

  return {
    p,
    cp: [ p[0] + k * r * cos, p[1] + k * r * sin ],
  }
}

function corner (p, p1, p2, r) {
  if (!r) {
    return { s: p, e: p }
  }

  const v1 = vector(p, p1)
  const v2 = vector(p, p2)
  const angle = angleBetween(v1, v2)
  const k = kappa(angle)
  const seg = r / Math.abs(Math.tan(angle / 2))
  const { p: s, cp: cp1 } = curve(v1, seg, r, k)
  const { p: e, cp: cp2 } = curve(v2, seg, r, k)

  return Object.entries({ s, cp1, cp2, e }).reduce(
    (acc, [ key, [ x, y ] ]) => ({
      ...acc,
      [key]: [ round(x), round(y) ],
    }),
    {},
  )
}

function pathDef (points, radius = 0) {
  const commands = []
  let last

  eachCons(
    [ points[points.length - 1], ...points, points[0] ],
    3,
    ([ prev, curr, next ]) => {
      const [ , , r = radius ] = curr
      const { s, cp1, cp2, e } = corner(curr, prev, next, r)

      if (!last) {
        commands.push(`M${s}`)
      } else if (last[0] === s[0]) {
        commands.push(`V${s[1]}`)
      } else if (last[1] === s[1]) {
        commands.push(`H${s[0]}`)
      } else {
        commands.push(`L${s}`)
      }

      if (r) {
        commands.push(`C${cp1} ${cp2} ${e}`)
      }

      last = e
    },
  )
  commands.push('Z')

  return commands.join('')
}

export { pathDef }
