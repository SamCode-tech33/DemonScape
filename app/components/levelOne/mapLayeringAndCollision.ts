import { SceneOneState } from "./SceneOneTypes";

export const mapLayering = (scene: Phaser.Scene & SceneOneState) => {
  const map = scene.make.tilemap({ key: "map" });
  const tiledMap = map.addTilesetImage(
    "level1-master-tileset",
    "level1-master-tileset"
  )!;

  const floorLayer = map.createLayer("floor", tiledMap, 0, 0);
  const rugLayer = map.createLayer("rug", tiledMap, 0, 0);
  const wallsLayer = map.createLayer("walls", tiledMap, 0, 0);
  const wallThingsLayer = map.createLayer("wall-objects", tiledMap, 0, 0);
  const hiddenFloorLayer = map.createLayer(
    "hidden-floor-objects",
    tiledMap,
    0,
    0
  );
  const floorObjectsLayer = map.createLayer("floor-objects", tiledMap, 0, 0);
  const largeFloorObjects = map.createLayer("floor-objects2", tiledMap, 0, 0);
  const surfaceItemsLayer = map.createLayer("surface-items", tiledMap, 0, 0);
  const fireLayer = map.createLayer("fire", tiledMap, 0, 0);

  floorLayer && floorLayer.setDepth(1);
  rugLayer && rugLayer.setDepth(2);
  wallsLayer && wallsLayer.setDepth(3);
  wallThingsLayer && wallThingsLayer.setDepth(4);
  hiddenFloorLayer && hiddenFloorLayer.setDepth(5);
  floorObjectsLayer && floorObjectsLayer.setDepth(6);
  largeFloorObjects && largeFloorObjects.setDepth(20);
  surfaceItemsLayer && surfaceItemsLayer.setDepth(21);
  fireLayer && fireLayer.setDepth(23);
};

export const collisions = (scene: Phaser.Scene & SceneOneState) => {
  const map = scene.make.tilemap({ key: "map" });
  const collisionLayer = map.getObjectLayer("collision");
  const collisionGroup = scene.physics.add.staticGroup();
  collisionLayer!.objects.forEach((obj: any) => {
    if (obj.rectangle) {
      const collisionRect = scene.add.rectangle(
        obj.x! + obj.width! / 2,
        obj.y! + obj.height! / 2,
        obj.width!,
        obj.height!
      );
      scene.physics.add.existing(collisionRect, true);
      collisionRect.setVisible(false);
      collisionGroup.add(collisionRect);
    }
  });
  return collisionGroup;
};
