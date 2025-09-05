const preLoadedAssets = (scene: any) => {
  scene.load.tilemapTiledJSON("map", "/assets/level1-master-map.json");
  scene.load.image(
    "level1-master-tileset",
    "/assets/level1-master-tileset.png"
  );
  scene.load.audio("bgm-1", "assets/music/deskMys.mp3");

  scene.load.spritesheet(
    "torch",
    "assets/animated-objects/torches-animated.png",
    {
      frameWidth: 32,
      frameHeight: 32,
    }
  );

  scene.load.spritesheet(
    "alchemy",
    "assets/animated-objects/alchemy-animated.png",
    {
      frameWidth: 32,
      frameHeight: 32,
    }
  );

  // PLAYER
  scene.load.spritesheet("idle", "assets/player/idle.png", {
    frameWidth: 64,
    frameHeight: 64,
  });
  scene.load.spritesheet("walk", "/assets/player/walk.png", {
    frameWidth: 64,
    frameHeight: 64,
  });
  scene.load.spritesheet("run", "/assets/player/run.png", {
    frameWidth: 64,
    frameHeight: 64,
  });
  scene.load.spritesheet("jump", "/assets/player/jump.png", {
    frameWidth: 64,
    frameHeight: 64,
  });
  scene.load.spritesheet("combat_idle", "assets/player/combat_idle.png", {
    frameWidth: 64,
    frameHeight: 64,
  });
  scene.load.spritesheet("emote", "assets/player/emote.png", {
    frameWidth: 64,
    frameHeight: 64,
  });
  scene.load.spritesheet("hurt", "assets/player/hurt.png", {
    frameWidth: 64,
    frameHeight: 64,
  });
  scene.load.spritesheet("shoot", "assets/player/shoot.png", {
    frameWidth: 64,
    frameHeight: 64,
  });
  scene.load.spritesheet("sit", "assets/player/sit.png", {
    frameWidth: 64,
    frameHeight: 64,
  });
  scene.load.spritesheet("halfslash", "assets/player/halfslash.png", {
    frameWidth: 64,
    frameHeight: 64,
  });
  scene.load.spritesheet("spellcast", "assets/player/spellcast.png", {
    frameWidth: 64,
    frameHeight: 64,
  });

  // NPCS
  // GHOST
  scene.load.spritesheet("sgr", "assets/npc/strangeGhost/strangeGhostRed.png", {
    frameWidth: 64,
    frameHeight: 64,
  });

  // DEMONS
  scene.load.spritesheet("dcult-walk", "assets/npc/demon-cultists/walk.png", {
    frameWidth: 64,
    frameHeight: 64,
  });
  scene.load.spritesheet("dcult-sit", "assets/npc/demon-cultists/sit.png", {
    frameWidth: 64,
    frameHeight: 64,
  });
  scene.load.spritesheet(
    "dcult-spell",
    "assets/npc/demon-cultists/spellcast.png",
    {
      frameWidth: 64,
      frameHeight: 64,
    }
  );
  scene.load.spritesheet("dcult-emote", "assets/npc/demon-cultists/emote.png", {
    frameWidth: 64,
    frameHeight: 64,
  });

  scene.load.spritesheet("w-dcult-walk", "assets/npc/femDemon/walk.png", {
    frameWidth: 64,
    frameHeight: 64,
  });
  scene.load.spritesheet("w-dcult-sit", "assets/npc/femDemon/sit.png", {
    frameWidth: 64,
    frameHeight: 64,
  });
  scene.load.spritesheet("w-dcult-spell", "assets/npc/femDemon/spellcast.png", {
    frameWidth: 64,
    frameHeight: 64,
  });
  scene.load.spritesheet("w-dcult-emote", "assets/npc/femDemon/emote.png", {
    frameWidth: 64,
    frameHeight: 64,
  });

  // SARA
  scene.load.spritesheet("sara-walk", "assets/npc/sara/walk.png", {
    frameWidth: 64,
    frameHeight: 64,
  });
  scene.load.spritesheet("sara-sit", "assets/npc/sara/sit.png", {
    frameWidth: 64,
    frameHeight: 64,
  });

  // INFOGUY
  scene.load.spritesheet("infoGuy-sit", "assets/npc/infoGuy/sit.png", {
    frameWidth: 64,
    frameHeight: 64,
  });

  // ZOMBIES
  scene.load.spritesheet("zHit", "assets/enemies/zombie/slash.png", {
    frameWidth: 64,
    frameHeight: 64,
  });
  scene.load.spritesheet("zWalk", "assets/enemies/zombie/walk.png", {
    frameWidth: 64,
    frameHeight: 64,
  });

  // SKELETON
  scene.load.spritesheet("skel-walk", "assets/npc/skelMan/walk.png", {
    frameWidth: 64,
    frameHeight: 64,
  });

  // ALCHEMISTS
  scene.load.spritesheet("alch-walk", "assets/npc/alchemists/walk.png", {
    frameWidth: 64,
    frameHeight: 64,
  });
};

export default preLoadedAssets;
