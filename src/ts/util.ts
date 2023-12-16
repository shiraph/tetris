export const getRandomInt = (min, max) =>
  Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + Math.ceil(min);

export const genRandNumberSequence = (len, rand) => {
  return [...Array(len)].map(() => getRandomInt(0, rand - 1))
}

export const showGameOver = (context, canvas) => {
  context.fillStyle = "black";
  context.globalAlpha = 0.75;
  context.fillRect(0, canvas.height / 2 - 30, canvas.width, 60);

  context.globalAlpha = 1;
  context.fillStyle = "white";
  context.font = "36px monospace";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText("GAME OVER", canvas.width / 2, canvas.height / 2);
}
