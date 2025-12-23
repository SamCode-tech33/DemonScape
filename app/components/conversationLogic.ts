import type Phaser from "phaser";
import type { ConvoSceneState, DialogueNode } from "./demonScapeTypes";

export const conversationLogic = (
  scene: Phaser.Scene & ConvoSceneState,
  color: string,
  stroke: string,
  convoBg: string,
  convoMusic: string
) => {
  const portrait = scene.add
    .image(scene.scale.width / 2, scene.scale.height / 2, convoBg)
    .setOrigin(0.5);
  portrait.displayWidth = scene.scale.width;
  portrait.displayHeight = scene.scale.height;

  // Dialogue box
  scene.add.rectangle(
    scene.scale.width / 2,
    scene.scale.height - 150,
    scene.scale.width,
    320,
    0x000000,
    0.4
  );

  scene.add.rectangle(
    scene.scale.width / 2,
    0,
    scene.scale.width,
    50,
    0x000000,
    0.7
  );

  scene.speakerText = scene.add.text(
    60,
    scene.scale.height - 278,
    scene.speakerName,
    {
      fontFamily: "Mostean",
      fontSize: "52px",
      color: color,
      stroke: stroke,
      strokeThickness: 1,
      wordWrap: { width: 150 },
    }
  );

  scene.playerSpeaker = scene.add.text(60, scene.scale.height - 110, "You:", {
    fontFamily: "Mostean",
    fontSize: "52px",
    color: "#ffcc00",
    stroke: "black",
    strokeThickness: 1,
  });

  scene.dialogueText = scene.add.text(240, scene.scale.height - 270, "", {
    fontFamily: "Mostean",
    fontSize: "40px",
    color: color,
    stroke: stroke,
    strokeThickness: 1,
    wordWrap: { width: scene.scale.width - 300 },
  });

  scene.emoteBg = scene.add.rectangle(
    scene.scale.width / 2,
    scene.scale.height - scene.scale.height,
    scene.scale.width,
    140,
    0x000000,
    0.4
  );

  scene.emoteText = scene.add.text(0, 15, "", {
    fontFamily: "Mostean",
    fontSize: "48px",
    color: "white",
    stroke: "yellow",
    strokeThickness: 1,
  });

  scene.emoteText.setAlpha(0);

  scene.tweens.add({
    targets: scene.emoteText,
    alpha: 1,
    duration: 1500,
    ease: "Power2",
    onComplete: () => {
      scene.tweens.add({
        targets: scene.emoteText,
        alpha: 0.33,
        duration: 1500,
        yoyo: true,
        repeat: -1,
      });
    },
  });

  scene.music = scene.sound.add(convoMusic, { loop: true, volume: 1 });
  scene.music.play();

  // Show first node
  showNode(0, scene);
};

const onChoiceKey = function (
  this: Phaser.Scene & ConvoSceneState,
  event: KeyboardEvent
) {
  if (this.voiceDialogue) {
    this.voiceDialogue.stop();
    this.sound.remove(this.voiceDialogue);
    this.voiceDialogue.destroy();
    this.voiceDialogue = null;
  }
  const key = parseInt(event.key, 10);
  if (!Number.isNaN(key) && key >= 1 && key <= 9) {
    const choice = this.dialogueNodes[this.currentNodeIndex].choices?.[key - 1];
    if (choice) {
      // Remove listener before recursing to next node
      this.input.keyboard?.off("keydown", onChoiceKey, this);
      showNode(choice.next, this);
    }
  }
};

const showNode = (index: number, scene: Phaser.Scene & ConvoSceneState) => {
  if (scene.speechInterval) {
    clearInterval(scene.speechInterval);
  }

  scene.currentNodeIndex = index;
  const node = scene.dialogueNodes[index];

  scene.input.keyboard?.removeListener("keydown-SPACE");

  // Clear previous text
  scene.input.keyboard?.off("keydown", onChoiceKey, scene);
  scene.dialogueText.setText("");
  scene.choiceTexts.map((c) => c.destroy());
  scene.choiceTexts = [];

  // === TYPEWRITER WITH FADE-IN EFFECT ===
  const fullText = node.text;
  const chars = fullText.split("");
  let currentCharIndex = 0;
  let typeSpeed: number;

  if (scene.voiceLoop === true) {
    typeSpeed = 11;
  } else {
    typeSpeed = 80;
  }

  if (scene.dialogueNodes[index].dialogueLine) {
    scene.speakerText.setText(scene.speakerName);
    scene.voiceDialogue = scene.sound.add(
      scene.dialogueNodes[index].dialogueLine,
      { volume: 2, loop: scene.voiceLoop }
    );
  } else {
    scene.speakerText.setText("You Thinking:");
  }

  scene.input.keyboard?.once("keydown-SPACE", () => {
    if (scene.speechInterval) {
      clearInterval(scene.speechInterval);
      scene.speechInterval = null;
    }
    if (scene.voiceDialogue) {
      scene.voiceDialogue.stop();
      scene.sound.remove(scene.voiceDialogue);
      scene.voiceDialogue.destroy();
      scene.voiceDialogue = null;
    }
    scene.dialogueText.setText(fullText);
    displayChoices(scene, node);
  });

  scene.speechInterval = setInterval(() => {
    if (currentCharIndex >= chars.length) {
      if (scene.speechInterval) {
        clearInterval(scene.speechInterval);
        scene.speechInterval = null;
        if (scene.voiceDialogue && scene.voiceLoop === true) {
          scene.voiceDialogue.stop();
          scene.sound.remove(scene.voiceDialogue);
          scene.voiceDialogue.destroy();
          scene.voiceDialogue = null;
        }
      }
      displayChoices(scene, node);
      return;
    }
    const char = chars[currentCharIndex];
    currentCharIndex++;
    scene.dialogueText.setText(scene.dialogueText.text + char);
  }, typeSpeed);
  if (scene.voiceDialogue && scene.dialogueNodes[index].dialogueLine) {
    scene.voiceDialogue.play();
  }
  if (scene.dialogueNodes[index].emote) {
    scene.emoteBg.setVisible(true);
    scene.emoteText.setText(scene.dialogueNodes[index].emote);
    scene.emoteText.setX(scene.scale.width / 2 - scene.emoteText.width / 2);
  } else {
    scene.emoteBg.setVisible(false);
    scene.emoteText.setText("");
  }
};

const displayChoices = (
  scene: Phaser.Scene & ConvoSceneState,
  node: DialogueNode
) => {
  // Remove old choices
  scene.choiceTexts.map((c) => c.destroy());
  scene.choiceTexts = [];

  // check for end of conversation
  if (!node.choices || node.choices.length === 0) {
    scene.add.text(
      300,
      scene.scale.height - 110,
      "Press space to exit conversation",
      {
        fontFamily: "Mostean",
        fontSize: "44px",
        color: "#ffcc00",
        stroke: "black",
        strokeThickness: 1,
        wordWrap: { width: scene.scale.width - 300 },
      }
    );
    scene.input.keyboard?.once("keydown-SPACE", () => {
      scene.music.stop();
      scene.scene.stop();
      scene.scene.resume("SceneOne", { from: scene.fromScene });
      if (scene.voiceDialogue) {
        scene.voiceDialogue.stop();
        scene.sound.remove(scene.voiceDialogue);
        scene.voiceDialogue.destroy();
        scene.voiceDialogue = null;
      }
    });
    return;
  }

  // Show new choices
  node.choices.forEach((choice, i) => {
    let startY = scene.scale.height - 110;
    let spacing = 40;

    // Special spacing for when there are many player options
    if (scene.currentNodeIndex === scene.manyOptionsNode) {
      startY = scene.scale.height - 220;
      spacing = 35;
    }

    const choiceText = scene.add.text(248, startY + i * spacing, choice.text, {
      fontFamily: "Mostean",
      fontSize: "32px",
      color: "#ffcc00",
      stroke: "black",
      strokeThickness: 1,
      wordWrap: { width: scene.scale.width - 300 },
    });
    scene.choiceTexts.push(choiceText);
  });
  scene.input.keyboard?.on("keydown", onChoiceKey, scene);
};
