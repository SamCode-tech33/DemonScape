import type { SceneOneState } from "./SceneOneTypes";

export const mapLayering = (scene: Phaser.Scene & SceneOneState) => {
  const map = scene.make.tilemap({ key: "map" });
  const tiledMap = map.addTilesetImage(
    "level1-master-tileset",
    "level1-master-tileset"
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
  const fireLayer = tiledMap && map.createLayer("fire", tiledMap, 0, 0);

  floorLayer?.setDepth(1);
  rugLayer?.setDepth(2);
  wallsLayer?.setDepth(3);
  wallThingsLayer?.setDepth(4);
  hiddenFloorLayer?.setDepth(5);
  floorObjectsLayer?.setDepth(6);
  largeFloorObjects?.setDepth(20);
  surfaceItemsLayer?.setDepth(21);
  fireLayer?.setDepth(23);
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
        obj.height
      );
      scene.physics.add.existing(collisionRect, true);
      collisionRect.setVisible(false);
      collisionGroup.add(collisionRect);
    }
  });
  return collisionGroup;
};
