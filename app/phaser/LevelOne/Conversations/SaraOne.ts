import Phaser from "phaser";

interface DialogueChoice {
  text: string;
  next: number; // index of next dialogue node
}

interface DialogueNode {
  text: string;
  choices?: DialogueChoice[];
}

export default class SaraOne extends Phaser.Scene {
  private dialogueNodes: DialogueNode[] = [
    {
      text: "Sara: ughh what? I'm busy.",
      choices: [
        {
          text: "1) I just drank this strange potion and I don't really know what is going on but I... passed. My um 'husk's' brain was the issue. Those um 'twins' said I should talk to you about taking the soul fragments from these zombies to heal?",
          next: 1,
        },
        {
          text: "2) Your busy and I'm in a damn existential crisis. Pretty sure it's a dream though. I was told to kill your pet zombies for soul fragments or something. The hell is this world?",
          next: 2,
        },
      ],
    },
    {
      text: "Sara: tch that bitch whore... She's jealous of my skill. Damnit. acting like that... your husk is probably short-circuiting your conciousness...",
      choices: [
        {
          text: "1) Excuse me, my conciousness? Oh... yeah that alchemist mentioned there was a bad integration or husk damage.",
          next: 3,
        },
        {
          text: "2) My conciousness is fine. It's you lot that are screwed in the head.",
          next: 4,
        },
      ],
    },
    {
      text: "Sara: Yeah I don't care about any of that. Damnit your husk is probably short-circuiting your conciousness...",
      choices: [
        {
          text: "1) Excuse me, my conciousness? Oh... yeah that alchemist mentioned there was a bad integration or husk damage.",
          next: 3,
        },
        {
          text: "2) My conciousness is fine. It's you lot that are screwed in the head.",
          next: 4,
        },
      ],
    },
    {
      text: "Sara: *She smirks* Oh so she probably gave you temporary control back... pathetic that you messed up something so basic.",
      choices: [{ text: "1) Continue...", next: 5 }],
    },
    {
      text: "Sara: It clearly isn't and neither is your logic. Tell me, is it more likely that every being in this room is crazy and just YOU are sane or is it more likely your the crazy one? Take all the time you need.",
      choices: [
        {
          text: "1) And if you gaze long enough into the abyss of collective folly, you may find that you alone still see clearly.",
          next: 6,
        },
      ],
    },
    {
      text: "Sara: Damnit, do you know how long it took me to program these soul fragments to fight... ughh fine, Maelvoth would have just killed you instead of making you drink that potion, but you have quite a lot of demonic energy, which makes it even stranger that you didn't integrate the possession correctly...",
      choices: [{ text: "1) Continue...", next: 8 }],
    },
    {
      text: "Sara: Ok Mr. Nietzsche... Look, your spirit is filtered through the mind's circuits. Either you didn't properly rewrite the brain on possesion... or damnit who prepared this body for you? Right you wouldn't know...",
      choices: [{ text: "1) Continue...", next: 5 }],
    },
    {
      text: "Sara: Maelvoth probably assumes he'll be killed by his superiors if he killed you before the final cleansing. Damn politics... I'll let you kill them, but I'm activating them. I'm sure if mere zombies are able to kill you, no one will complain... good luck.",
    },
  ];

  private currentNodeIndex: number = 0;
  private dialogueText!: Phaser.GameObjects.Text;
  private choiceTexts: Phaser.GameObjects.Text[] = [];
  private music!: Phaser.Sound.BaseSound;

  constructor() {
    super({ key: "SaraOne" });
  }

  preload() {
    this.load.image("SaraOneConvo", "/assets/conversations/sara.png");
    this.load.audio("SaraOneMusic", "/assets/music/fogTrees.mp3");
  }

  create() {
    // Background portrait
    const portrait = this.add
      .image(this.scale.width / 2, this.scale.height / 2, "SaraOneConvo")
      .setOrigin(0.5);

    portrait.displayWidth = this.scale.width;
    portrait.displayHeight = this.scale.height;

    // Dialogue box
    this.add.rectangle(
      this.scale.width / 2,
      this.scale.height - 150,
      this.scale.width,
      290,
      0x000000,
      0.4
    );

    this.dialogueText = this.add.text(150, this.scale.height - 270, "", {
      fontSize: "26px",
      color: "#ffffff",
      wordWrap: { width: this.scale.width - 300 },
    });

    this.music = this.sound.add("SaraOneMusic", { loop: true, volume: 1 });
    this.music.play();

    // Show first node
    this.showNode(0);

    // Input: pick choices with number keys
    this.input.keyboard!.on("keydown", (event: KeyboardEvent) => {
      const key = parseInt(event.key);
      if (!isNaN(key)) {
        const choice =
          this.dialogueNodes[this.currentNodeIndex].choices?.[key - 1];
        if (choice) {
          this.showNode(choice.next);
        }
      }
    });
  }

  private showNode(index: number) {
    this.currentNodeIndex = index;
    const node = this.dialogueNodes[index];

    this.dialogueText.setText(node.text);

    // Remove old choices
    this.choiceTexts.forEach((c) => c.destroy());
    this.choiceTexts = [];

    // If no choices, check if end
    if (!node.choices || node.choices.length === 0) {
      this.add.text(
        180,
        this.scale.height - 110,
        "Press space to exit conversation",
        {
          fontSize: "24px",
          color: "#ffcc00",
          wordWrap: { width: this.scale.width - 300 },
        }
      );
      this.input.keyboard!.once("keydown-SPACE", () => {
        this.music.stop();
        this.scene.stop();
        this.scene.resume("SceneOne");
      });
      return;
    }

    // Show new choices
    node.choices.forEach((choice, i) => {
      const choiceText = this.add.text(
        180,
        this.scale.height - 145 + i * 80,
        choice.text,
        {
          fontSize: "24px",
          color: "#ffcc00",
          wordWrap: { width: this.scale.width - 300 },
        }
      );
      this.choiceTexts.push(choiceText);
    });
  }
}
