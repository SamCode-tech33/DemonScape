export const gameConfig = {
  type: "WEBGL",
  width: 2720,
  height: 1280,
  parent: "gameCanvas",
  physics: {
    default: "arcade",
    arcade: { gravity: { y: 300, x: 0 }, debug: true },
  },
};
