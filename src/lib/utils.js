function eachCons (arr, n, fn) {
  const length = arr.length - n + 1

  Array.from({ length }, (_, i) => fn(arr.slice(i, i + n)))
}

function round (n, dp = 3) {
  const exp = dp ? Math.pow(10, dp) : 1

  return Math.round((n + Number.EPSILON) * exp) / exp
}

export { eachCons, round }
