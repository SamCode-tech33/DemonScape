export const Alch2Dialogue = (scene: any) => {
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

export const hallwayGirlsDialogue = (scene: any) => {
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
  let count = 0;
  scene.time.delayedCall(4000, () =>
    convo(scene, participants, lines, count, 48, 48, 43, 43)
  );
};

export const guysAlterDialogue = (scene: any) => {
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
  let count = 0;
  scene.time.delayedCall(4000, () =>
    convo(scene, participants, lines, count, 48, 48, 43, 43)
  );
};

export const girlsLeftWallDialogue = (scene: any) => {
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
  let count = 0;
  scene.time.delayedCall(5500, () =>
    convo(scene, participants, lines, count, -16, 16, -21, 12)
  );
};

const convo = (
  scene: any,
  participants: any,
  lines: string[],
  count: number,
  boxOffsetX: number,
  boxOffsetY: number,
  textOffsetX: number,
  textOffsetY: number
) => {
  const npc = participants[count % 2];
  const line = lines[count];
  if (!npc || !line) {
    count = 0;
    scene.time.delayedCall(16000, () =>
      convo(
        scene,
        participants,
        lines,
        count,
        boxOffsetX,
        boxOffsetY,
        textOffsetX,
        textOffsetY
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
      count,
      boxOffsetX,
      boxOffsetY,
      textOffsetX,
      textOffsetY
    )
  );
};
