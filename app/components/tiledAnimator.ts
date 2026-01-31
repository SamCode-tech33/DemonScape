type AnimatedTileInstance = {
  tile: Phaser.Tilemaps.Tile;
  frames: number[];
  durations: number[];
  frameIndex: number;
  elapsed: number;
};

export function setupManualTileAnimations(
  scene: Phaser.Scene,
  map: Phaser.Tilemaps.Tilemap,
  layers: Phaser.Tilemaps.TilemapLayer[],
) {
  const animatedTiles: AnimatedTileInstance[] = [];

  // Grab animation definitions from tileset
  const tileset = map.tilesets[0];
  const tileData = tileset.tileData;

  // Build lookup: baseTileIndex -> animation data
  const animationLookup = new Map<
    number,
    { frames: number[]; durations: number[] }
  >();

  Object.entries(tileData).forEach(([localId, data]: any) => {
    if (!data.animation) return;

    animationLookup.set(tileset.firstgid + Number(localId), {
      frames: data.animation.map((f: any) => tileset.firstgid + f.tileid),
      durations: data.animation.map((f: any) => f.duration),
    });
  });

  // Scan layers for animated tiles
  layers.forEach((layer) => {
    layer.forEachTile((tile) => {
      const anim = animationLookup.get(tile.index);
      if (!anim) return;

      animatedTiles.push({
        tile,
        frames: anim.frames,
        durations: anim.durations,
        frameIndex: 0,
        elapsed: 0,
      });
    });
  });

  // Update loop
  scene.events.on("update", (_Time: any, delta: any) => {
    animatedTiles.forEach((anim) => {
      anim.elapsed += delta;

      const frameDuration = anim.durations[anim.frameIndex];
      if (anim.elapsed >= frameDuration) {
        anim.elapsed = 0;
        anim.frameIndex = (anim.frameIndex + 1) % anim.frames.length;
        anim.tile.index = anim.frames[anim.frameIndex];
      }
    });
  });

  console.log(`[TileAnimator] Animated tiles active: ${animatedTiles.length}`);
}
