import { SceneOneState } from "./SceneOneTypes";

const preLoadedAssets = (scene: Phaser.Scene & SceneOneState) => {
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
  scene.load.spritesheet("slash", "assets/player/slash.png", {
    frameWidth: 64,
    frameHeight: 64,
  });

  // NPCS
  // GHOST
  scene.load.spritesheet("sgr", "assets/npc/strangeGhost/strangeGhostRed.png", {
    frameWidth: 64,
    frameHeight: 64,
  });

  // CULT HEAD
  scene.load.spritesheet("cult-head-walk", "assets/npc/cult-head/walk.png", {
    frameWidth: 64,
    frameHeight: 64,
  });
  scene.load.spritesheet("cult-head-sit", "assets/npc/cult-head/sit.png", {
    frameWidth: 64,
    frameHeight: 64,
  });
  scene.load.spritesheet(
    "cult-head-spell",
    "assets/npc/cult-head/spellcast.png",
    {
      frameWidth: 64,
      frameHeight: 64,
    }
  );
  scene.load.spritesheet("cult-head-emote", "assets/npc/cult-head/emote.png", {
    frameWidth: 64,
    frameHeight: 64,
  });

  // FEMALE CULTISTS

  scene.load.spritesheet(
    "cultist-female-walk",
    "assets/npc/cultist-female/walk.png",
    {
      frameWidth: 64,
      frameHeight: 64,
    }
  );
  scene.load.spritesheet(
    "cultist-female-sit",
    "assets/npc/cultist-female/sit.png",
    {
      frameWidth: 64,
      frameHeight: 64,
    }
  );
  scene.load.spritesheet(
    "cultist-female-spell",
    "assets/npc/cultist-female/spellcast.png",
    {
      frameWidth: 64,
      frameHeight: 64,
    }
  );
  scene.load.spritesheet(
    "cultist-female-emote",
    "assets/npc/cultist-female/emote.png",
    {
      frameWidth: 64,
      frameHeight: 64,
    }
  );

  // MALE CULTISTS

  scene.load.spritesheet(
    "cultist-male-walk",
    "assets/npc/cultist-male/walk.png",
    {
      frameWidth: 64,
      frameHeight: 64,
    }
  );
  scene.load.spritesheet(
    "cultist-male-sit",
    "assets/npc/cultist-male/sit.png",
    {
      frameWidth: 64,
      frameHeight: 64,
    }
  );
  scene.load.spritesheet(
    "cultist-male-spell",
    "assets/npc/cultist-male/spellcast.png",
    {
      frameWidth: 64,
      frameHeight: 64,
    }
  );
  scene.load.spritesheet(
    "cultist-male-emote",
    "assets/npc/cultist-male/emote.png",
    {
      frameWidth: 64,
      frameHeight: 64,
    }
  );

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
  scene.load.spritesheet("zHalfslash", "assets/enemies/zombie/halfslash.png", {
    frameWidth: 64,
    frameHeight: 64,
  });
  scene.load.spritesheet("zWalk", "assets/enemies/zombie/walk.png", {
    frameWidth: 64,
    frameHeight: 64,
  });
  scene.load.spritesheet("z-slash", "assets/enemies/zombie/slash.png", {
    frameWidth: 64,
    frameHeight: 64,
  });
  scene.load.spritesheet("z-jump", "assets/enemies/zombie/jump.png", {
    frameWidth: 64,
    frameHeight: 64,
  });
  scene.load.spritesheet("z-hurt", "assets/enemies/zombie/hurt.png", {
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
  scene.load.spritesheet("alch-idle", "assets/npc/alchemists/idle.png", {
    frameWidth: 64,
    frameHeight: 64,
  });
};

export default preLoadedAssets;
