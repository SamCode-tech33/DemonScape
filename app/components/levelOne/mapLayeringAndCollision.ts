import type { SceneOneState } from "./SceneOneTypes";
import { setupManualTileAnimations } from "../../components/tiledAnimator";

export const mapLayering = (scene: Phaser.Scene & SceneOneState) => {
  scene.map = scene.add.tilemap("map");

  const tileset = scene.map.addTilesetImage(
    "level1-master-tileset",
    "level1-master-tileset",
  );
  if (!tileset) {
    throw new Error("Tileset 'level1-master-tileset' failed to load");
  }

  const makeLayer = (name: string): Phaser.Tilemaps.TilemapLayer => {
    const layer = scene.map.createLayer(name, tileset, 0, 0);
    if (!layer) throw new Error(`Tiled layer '${name}' not found`);
    return layer;
  };

  scene.floorLayer = makeLayer("floor").setDepth(1);
  scene.rugLayer = makeLayer("rug").setDepth(2);
  scene.wallsLayer = makeLayer("walls");
  scene.wallThingsLayer = makeLayer("wall-objects");
  scene.floorObjectsLayer = makeLayer("floor-objects");
  scene.largeFloorObjects = makeLayer("floor-objects2");
  scene.surfaceItemsLayer = makeLayer("surface-items");
  scene.fire1 = makeLayer("fire1");
  scene.fire2 = makeLayer("fire2");
  scene.fire3 = makeLayer("fire3");
  scene.runes = makeLayer("runes").setDepth(20);
  scene.alchemy1 = makeLayer("alchemy1");
  scene.alchemy2 = makeLayer("alchemy2");

  setupManualTileAnimations(scene, scene.map, [
    scene.fire1,
    scene.fire2,
    scene.fire3,
    scene.runes,
    scene.alchemy1,
    scene.alchemy2,
  ]);

  return tileset;
};

export const collisions = (scene: Phaser.Scene & SceneOneState) => {
  const map = scene.make.tilemap({ key: "map" });
  const collisionLayer = map.getObjectLayer("collision");
  const collisionGroup = scene.physics.add.staticGroup();
  collisionLayer?.objects.forEach((obj: Phaser.Types.Tilemaps.TiledObject) => {
    if (
      obj.rectangle &&
      obj.x !== undefined &&
      obj.y !== undefined &&
      obj.width !== undefined &&
      obj.height !== undefined
    ) {
      const collisionRect = scene.add.rectangle(
        obj.x + obj.width / 2,
        obj.y + obj.height / 2,
        obj.width,
        obj.height,
      );
      scene.physics.add.existing(collisionRect, true);
      collisionRect.setVisible(false);
      collisionGroup.add(collisionRect);
    }
  });
  return collisionGroup;
};
