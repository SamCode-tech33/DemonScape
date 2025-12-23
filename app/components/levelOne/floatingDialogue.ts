import type { SceneOneState } from "./SceneOneTypes";

export const Alch2Dialogue = (scene: Phaser.Scene & SceneOneState) => {
  scene.time.addEvent({
    delay: 7000,
    loop: true,
    callback: () => {
      if (scene.chatBubbleAlch2) {
        scene.chatBubbleAlch2.destroy();
      }
      if (scene.chatTextAlch2) {
        scene.chatTextAlch2.destroy();
      }
      scene.chatBubbleAlch2 = scene.add.graphics();
      scene.chatBubbleAlch2
        .fillStyle(0x000000, 0.6)
        .fillRoundedRect(
          scene.alchTwin2.x - 28,
          scene.alchTwin2.y - 40,
          56,
          16,
          6
        )
        .setDepth(50);

      scene.chatTextAlch2 = scene.add
        .text(scene.alchTwin2.x - 21, scene.alchTwin2.y - 35, "uahhnn....❤️", {
          fontSize: "6px",
          color: "#ffffff",
          resolution: 2.5,
        })
        .setDepth(50);

      scene.time.delayedCall(2000, () => {
        scene.chatBubbleAlch2?.destroy();
        scene.chatTextAlch2?.destroy();
      });
    },
  });
};

export const hallwayGirlsDialogue = (scene: Phaser.Scene & SceneOneState) => {
  const npcs = scene.npcs.getChildren() as Phaser.Physics.Arcade.Sprite[];
  const participants = [npcs[4], npcs[6]];
  const lines: string[] = [
    "He screamed like a little bitch and dropped his heart",
    "I know... so pathetic",
    "Sounds like bad integration.",
    "Anyways, I heard Maelvoth is hiding something valuable here...",
    "Really?! come back tonight?",
    "Sure. It's gotta be in that empty room there.",
    "hmmm...",
  ];
  scene.time.delayedCall(4000, () =>
    convo(scene, participants, lines, 48, 48, 43, 43, false)
  );
};

export const guysAlterDialogue = (scene: Phaser.Scene & SceneOneState) => {
  const npcs = scene.npcs.getChildren() as Phaser.Physics.Arcade.Sprite[];
  const participants = [npcs[2], npcs[3]];
  const lines: string[] = [
    "Whats your name?",
    "Frank.",
    "That's a dumb name...",
    "Well, what's your name then?",
    "Azamoff",
    "That's an even dumber name! No one suspects Frank.",
    "Hmmm... good point.",
    "So wierd having to meet people in new bodies",
    "Yeah and you don't know if you know them or not yet",
    "Total mindfuck...",
    "Yeah...",
  ];
  scene.time.delayedCall(8000, () =>
    convo(scene, participants, lines, 48, 48, 43, 43, false)
  );
};

export const girlsLeftWallDialogue = (scene: Phaser.Scene & SceneOneState) => {
  const npcs = scene.npcs.getChildren() as Phaser.Physics.Arcade.Sprite[];
  const participants = [npcs[0], npcs[1]];
  const lines: string[] = [
    "This body is great. Looking forward to defiling it...❤️",
    "Ughhh, Why didn't I get big breasts like you.",
    "Demon sex count heirarchy...",
    "What does that mean?",
    "The more bodies, the bigger the assets. hehe",
    "Heh nice one.",
    "It's true though. Want to trick some humans into having sex with us?",
    "Sure! kill him part way through",
    "Up to you... but demon halflings are good front-lines fodder.",
    "whohh... you do deserve those big breasts...",
    "Yeah...",
  ];
  scene.time.delayedCall(12000, () =>
    convo(scene, participants, lines, -16, 16, -21, 12, false)
  );
};

export const threeMenGroup = (scene: Phaser.Scene & SceneOneState) => {
  const npcs = scene.npcs.getChildren() as Phaser.Physics.Arcade.Sprite[];
  const participants = [npcs[5], npcs[8], npcs[9]];
  const lines: string[] = [
    "And you are absolutely sure?",
    "YES, It had to have been a human who killed my last husk.",
    "It makes sense. A Light-Bleached would have also fried your spirit.",
    "Were you blind drunk?! There's no way a Human could take you.",
    "I was also surprised, humans can't even kill zombies.",
    "Either you're hiding your incompetence, or the Humans are getting help...",
  ];
  scene.time.delayedCall(16000, () =>
    convo(scene, participants, lines, 48, 48, 43, 45, true)
  );
};

export const singleTriggerDialogue = (
  scene: Phaser.Scene & SceneOneState,
  levelFinish: boolean
) => {
  const npcs = scene.npcs.getChildren() as Phaser.Physics.Arcade.Sprite[];
  const targets = [npcs[7], npcs[11], npcs[10], npcs[12]];
  let npcInRange: Phaser.Physics.Arcade.Sprite | undefined;
  let line: string = "";
  for (const npc of targets) {
    if (
      Math.abs(scene.player.x - npc.x) < 88 &&
      Math.abs(scene.player.y - npc.y) < 88
    ) {
      npcInRange = npc;
      break;
    }
  }

  if (npcInRange === targets[0]) {
    line =
      "I'm afraid to talk to anyone. What if they find out who I am... Best start fresh. I'll flee town tonight. I'm dead either way...";
  } else if (npcInRange === targets[1]) {
    line =
      "It's you! The pussy! We're watching you until Maelvoth says otherwise. I'll kill you if I have to. Get your head right.";
  } else if (npcInRange === targets[2]) {
    line =
      "Um.. Maelvoth, I know our town is short on husks, but I'm male. Can I please have the body of the demon who lost his cool earlier?...";
  } else if (npcInRange === targets[3] && levelFinish) {
    line =
      "Hehe unfortunate we didn't get to kill you. Good luck out there. Cause some mayhem before the Cleansing yeah?";
  } else if (npcInRange === targets[3]) {
    line =
      "YOU ARE NOT ALLOWED TO LEAVE UNTIL MAELVOTH GIVES THE ALL CLEAR. DO NOT APPROACH.";
  }
  if (npcInRange) {
    if (!scene.approachBox) {
      scene.approachBox = scene.add
        .graphics()
        .fillStyle(0x000000, 0.6)
        .fillRoundedRect(npcInRange.x - 48, npcInRange.y - 60, 104, 40, 6)
        .setDepth(50);
    }

    if (!scene.approachText) {
      scene.approachText = scene.add
        .text(npcInRange.x - 43, npcInRange.y - 55, line, {
          fontSize: "5px",
          color: "#ffffff",
          resolution: 3,
          wordWrap: { width: 100 },
        })
        .setDepth(50);
    } else {
      scene.approachText.setText(line);
    }
  } else if (scene.approachBox && scene.approachText) {
    scene.approachBox.destroy();
    scene.approachText.destroy();
    scene.approachBox = undefined;
    scene.approachText = undefined;
    npcInRange = undefined;
  }
};

const convo = (
  scene: Phaser.Scene & SceneOneState,
  participants: Phaser.Physics.Arcade.Sprite[],
  lines: string[],
  boxOffsetX: number,
  boxOffsetY: number,
  textOffsetX: number,
  textOffsetY: number,
  group: boolean
) => {
  let npc: Phaser.Physics.Arcade.Sprite | undefined;
  let count = 0;
  if (group) {
    if (count === 0 || count === 3) {
      npc = participants[0];
    } else if (count === 1 || count === 4) {
      npc = participants[1];
    } else {
      npc = participants[2];
    }
  } else {
    npc = participants[count % 2];
  }

  const line = lines[count];
  if (!npc || !line) {
    count = 0;
    scene.time.delayedCall(16000, () =>
      convo(
        scene,
        participants,
        lines,
        boxOffsetX,
        boxOffsetY,
        textOffsetX,
        textOffsetY,
        group
      )
    );
    return;
  }
  const chatBubble = scene.add.graphics();
  chatBubble
    .fillStyle(0x000000, 0.6)
    .fillRoundedRect(npc.x - boxOffsetX, npc.y - boxOffsetY, 104, 24, 6)
    .setDepth(50);
  const chatText = scene.add
    .text(npc.x - textOffsetX, npc.y - textOffsetY, line, {
      fontSize: "6px",
      color: "#ffffff",
      resolution: 2.5,
      wordWrap: { width: 100 },
    })
    .setDepth(50);
  scene.time.delayedCall(3000, () => {
    chatBubble.destroy();
    chatText.destroy();
  });
  count++;
  scene.time.delayedCall(3200, () =>
    convo(
      scene,
      participants,
      lines,
      boxOffsetX,
      boxOffsetY,
      textOffsetX,
      textOffsetY,
      group
    )
  );
};
