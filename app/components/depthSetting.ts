// depthSetting.ts
import type Phaser from "phaser";
import type { SceneOneState } from "./levelOne/SceneOneTypes"; // adjust path

type SceneWithState = Phaser.Scene & SceneOneState;
type Sortable = Phaser.GameObjects.Sprite;

interface TileGroupLayer {
  layer: Phaser.Tilemaps.TilemapLayer;
  bias: number; // tiebreak so e.g. surface items draw over the table under them
  stack?: string; // layers with the same stack key are measured as one vertical object
  animated?: boolean; // true if your TileAnimator changes this layer's tile indexes
}

export interface DepthSorter {
  update(): void;
}

// Drops undefined entries and narrows the type
const present = (list: (Sortable | undefined)[]): Sortable[] =>
  list.filter((s): s is Sortable => s !== undefined);

// Feet = physics body bottom if there is one, otherwise the sprite's bottom edge
const feetY = (s: Sortable) => {
  const body = s.body as Phaser.Physics.Arcade.Body | null;
  return body ? body.bottom : s.getBottomCenter().y;
};

function tilesToSprites(
  scene: SceneWithState,
  tileset: Phaser.Tilemaps.Tileset,
  group: TileGroupLayer[],
): () => void {
  const { map } = scene;
  const texture = tileset.image;
  if (!texture) throw new Error("Tileset has no image loaded");
  const th = map.tileHeight;

  const frameFor = (index: number) => {
    const key = `tile_${index}`;
    if (!texture.has(key)) {
      const c = tileset.getTileTextureCoordinates(index) as {
        x: number;
        y: number;
      } | null;
      if (c) {
        texture.add(key, 0, c.x, c.y, tileset.tileWidth, tileset.tileHeight);
      }
    }
    return key;
  };

  // Is any layer in the same stack occupied at this tile?
  const occupied = (stack: string, x: number, y: number) =>
    group.some((g) => (g.stack ?? "main") === stack && g.layer.hasTileAt(x, y));

  const animated: {
    img: Phaser.GameObjects.Image;
    layer: Phaser.Tilemaps.TilemapLayer;
    x: number;
    y: number;
    last: number;
  }[] = [];

  for (const { layer, bias, stack = "main", animated: isAnimated } of group) {
    layer.forEachTile(
      (tile) => {
        let baseRow = tile.y;
        while (occupied(stack, tile.x, baseRow + 1)) baseRow++;

        const img = scene.add
          .image(
            layer.x + tile.pixelX,
            layer.y + tile.pixelY,
            texture.key,
            frameFor(tile.index),
          )
          .setOrigin(0, 0)
          .setFlip(tile.flipX, tile.flipY)
          // -1 so a player standing exactly on an object's bottom edge draws in front
          .setDepth((baseRow + 1) * th - 1 + bias);

        if (isAnimated) {
          animated.push({ img, layer, x: tile.x, y: tile.y, last: tile.index });
        }
      },
      undefined,
      0,
      0,
      map.width,
      map.height,
      { isNotEmpty: true },
    );

    // Hide, don't destroy: collision and your TileAnimator still use the layer's data
    layer.setVisible(false);
  }

  return () => {
    for (const a of animated) {
      const t = a.layer.getTileAt(a.x, a.y, true);
      if (t.index !== a.last) {
        a.last = t.index;
        a.img.setVisible(t.index > -1);
        if (t.index > -1) a.img.setFrame(frameFor(t.index));
      }
    }
  };
}

export function setupDepthSorting(
  scene: SceneWithState,
  tileset: Phaser.Tilemaps.Tileset,
): DepthSorter {
  // 1. Tile layers -> sorted images
  const syncAnimatedTiles = tilesToSprites(scene, tileset, [
    // Walls and things hung on them form their own stack, so a wall never
    // inherits the base of a bookshelf standing against it
    { layer: scene.wallsLayer, bias: 0, stack: "wall" },
    { layer: scene.wallThingsLayer, bias: 0.005, stack: "wall" },

    { layer: scene.fire1, bias: 10, stack: "wall", animated: true },
    { layer: scene.fire2, bias: 10, stack: "wall", animated: true },
    { layer: scene.fire3, bias: 10, stack: "wall", animated: true },

    { layer: scene.alchemy1, bias: 0, animated: true },
    { layer: scene.alchemy2, bias: 0, animated: true },
    { layer: scene.floorObjectsLayer, bias: 0 },
    { layer: scene.largeFloorObjects, bias: 0.01 },
    { layer: scene.surfaceItemsLayer, bias: 0.02 },
  ]);

  // 2. Sprites that can move: every frame
  const moving = new Set<Sortable>(
    present([
      scene.player,
      scene.cultHead,
      scene.alchTwin,
      scene.alchTwin2,
      scene.sara,
      scene.ghost,
      scene.skel,
      scene.zom1,
      scene.zom2,
      scene.zom3,
    ]),
  );

  const sortSprite = (s: Sortable) => {
    if (s.active) s.setDepth(feetY(s));
  };

  const sortNpc = (s: Sortable) => {
    if (s.active) s.setDepth(feetY(s) + 16);
  };

  return {
    update() {
      for (const s of moving) sortSprite(s);
      for (const c of scene.npcs?.getChildren() ?? []) {
        sortNpc(c as Sortable);
      }
      syncAnimatedTiles();
    },
  };
}
