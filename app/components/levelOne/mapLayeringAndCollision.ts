import type { SceneOneState } from "./SceneOneTypes";
import { setupManualTileAnimations } from "../../components/tiledAnimator";

export const mapLayering = (scene: Phaser.Scene & SceneOneState) => {
  const map = scene.add.tilemap("map");
  const tiledMap = map.addTilesetImage(
    "level1-master-tileset",
    "level1-master-tileset",
  );

  const floorLayer = tiledMap && map.createLayer("floor", tiledMap, 0, 0);
  const rugLayer = tiledMap && map.createLayer("rug", tiledMap, 0, 0);
  const wallsLayer = tiledMap && map.createLayer("walls", tiledMap, 0, 0);
  const wallThingsLayer =
    tiledMap && map.createLayer("wall-objects", tiledMap, 0, 0);
  const hiddenFloorLayer =
    tiledMap && map.createLayer("hidden-floor-objects", tiledMap, 0, 0);
  const floorObjectsLayer =
    tiledMap && map.createLayer("floor-objects", tiledMap, 0, 0);
  const largeFloorObjects =
    tiledMap && map.createLayer("floor-objects2", tiledMap, 0, 0);
  const surfaceItemsLayer =
    tiledMap && map.createLayer("surface-items", tiledMap, 0, 0);
  const fire1 = tiledMap && map.createLayer("fire1", tiledMap, 0, 0);
  const fire2 = tiledMap && map.createLayer("fire2", tiledMap, 0, 0);
  const fire3 = tiledMap && map.createLayer("fire3", tiledMap, 0, 0);
  const runes = tiledMap && map.createLayer("runes", tiledMap, 0, 0);
  const brokenRunes =
    tiledMap && map.createLayer("broken-rune", tiledMap, 0, 0);
  const alchemy1 = tiledMap && map.createLayer("alchemy1", tiledMap, 0, 0);
  const alchemy2 = tiledMap && map.createLayer("alchemy2", tiledMap, 0, 0);

  floorLayer?.setDepth(1);
  rugLayer?.setDepth(2);
  wallsLayer?.setDepth(3);
  wallThingsLayer?.setDepth(4);
  brokenRunes?.setDepth(4);
  hiddenFloorLayer?.setDepth(5);
  runes?.setDepth(6);
  alchemy1?.setDepth(6);
  alchemy2?.setDepth(6);
  floorObjectsLayer?.setDepth(6);
  largeFloorObjects?.setDepth(20);
  surfaceItemsLayer?.setDepth(21);
  fire1?.setDepth(23);
  fire2?.setDepth(23);
  fire3?.setDepth(23);

  setupManualTileAnimations(
    scene,
    map,
    [
      fire1,
      fire2,
      fire3,
      brokenRunes,
      alchemy1,
      alchemy2,
      surfaceItemsLayer,
    ].filter((layer): layer is Phaser.Tilemaps.TilemapLayer => layer !== null),
  );
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
