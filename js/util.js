export const getRandomInt = (min, max) =>
  Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + Math.ceil(min);

export const genRandNumberSequence = (len, rand) => {
  return [...Array(len)].map(() => getRandomInt(0, rand - 1))
}
