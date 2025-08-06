export const gameConfig = {
  type: "WEBGL",
  width: 1536,
  height: 740,
  parent: "gameCanvas",
  physics: {
    default: "arcade",
    arcade: { gravity: { y: 300, x: 0 }, debug: true },
  },
};
