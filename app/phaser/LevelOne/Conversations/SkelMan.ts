import { DialogueNode } from "@/app/components/demonScapeTypes";
export default class SkelMan extends Phaser.Scene {
  public dialogueNodes: DialogueNode[] = [
    {
      text: "Fedora Skeleton: WAAAAAAZZZZZZZUUUUUPPPPPPPP?",
      choices: [
        {
          text: "1) And now there is a talking skeleton... I'm insane. I hope there is a lot of padding in my crazy room.",
          next: 1,
        },
        {
          text: "2) A-a talking skeleton? *you back up slowly* uh hi...",
          next: 1,
        },
      ],
    },
    {
      text: "Fedora Skeleton: WHHHAATTT?! you can see me?",
      choices: [
        {
          text: "1) Yes and you are very ugly.",
          next: 2,
        },
        {
          text: "2) Should I not be able to?",
          next: 3,
        },
      ],
    },
    {
      text: "Fedora Skeleton: GEHEHEHEH I'm prettier than what's inside you. *He points at his eye socket* I'm winking GEHEHEH",
      choices: [{ text: "1) Continue...", next: 3 }],
    },
    {
      text: "Fedora Skeleton: GEH! Yeah it's wierd that you can see me. I'm Light-Bleached after all.",
      choices: [
        { text: "1) What is Light-Bleached?", next: 4 },
        {
          text: "2) Can I get some of that bleach for my eyes?",
          next: 4,
        },
      ],
    },
    {
      text: "Fedora Skeleton: GEHEHEHEHEH ANYWAYS DO YOU LIKE PUZZLES? THERE IS ONE IN THIS VERY ROOM WOOWEEWOOWEE",
      choices: [
        {
          text: "1) How about you tell me what Light-Bleached means instead?",
          next: 5,
        },
        {
          text: "2) I didn't ask for a puzzle...",
          next: 6,
        },
      ],
    },
    {
      text: "Fedora Skeleton: GEHEHEHEHEH ANYWAYS DO YOU LIKE PUZZLES? THERE IS ONE IN THIS VERY ROOM WOOWEEWOOWEE",
      choices: [
        {
          text: "1) OK...",
          next: 6,
        },
      ],
    },
    {
      text: "Fedora Skeleton: GEHEHEHEHEH ANYWAYS DO YOU LIKE PUZZLES? THERE IS ONE IN THIS VERY ROOM WOOWEEWOOWEE",
    },
  ];

  public currentNodeIndex: number = 0;
  public dialogueText!: Phaser.GameObjects.Text;
  public choiceTexts: Phaser.GameObjects.Text[] = [];
  public music!: Phaser.Sound.BaseSound;

  constructor() {
    super({ key: "SkelMan" });
  }

  preload() {
    this.load.image("SkelManConvo", "/assets/conversations/laugh-skel.png");
    this.load.audio("SkelManMusic", "/assets/music/dimension-2.mp3");
  }

  create() {
    // Background portrait
    const portrait = this.add
      .image(this.scale.width / 2, this.scale.height / 2, "SkelManConvo")
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

    this.music = this.sound.add("SkelManMusic", { loop: true, volume: 1 });
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
        this.scale.height - 110 + i * 40,
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
