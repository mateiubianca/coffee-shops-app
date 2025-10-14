export const isValidPosition = (position) => {
  return !(isNaN(position.x) || isNaN(position.y))
}

export const getManhattanDistance = (origin, destination) => {
  if (!isValidPosition(origin) || !isValidPosition(destination)) {
    throw new Error('invalid position')
  }

  return Number(
    (
      Math.abs(Number(destination.x) - Number(origin.x)) +
      Math.abs(Number(destination.y) - Number(origin.y))
    ).toFixed(4)
  )
}

export const getEuclideanDistance = (origin, destination) => {
  if (!isValidPosition(origin) || !isValidPosition(destination)) {
    throw new Error('invalid position')
  }

  return Math.hypot(
    Number(destination.x) - Number(origin.x),
    Number(destination.y) - Number(origin.y)
  ).toFixed(4)
}
