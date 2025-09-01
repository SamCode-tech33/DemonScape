import Phaser from "phaser";

interface DialogueChoice {
  text: string;
  next: number; // index of next dialogue node
}

interface DialogueNode {
  text: string;
  choices?: DialogueChoice[];
}

export default class CultHead extends Phaser.Scene {
  private dialogueNodes: DialogueNode[] = [
    {
      text: "Cult Head: You whine like fettered swine. Why?",
      choices: [
        {
          text: "1) Th-this heart in my hand. . . wh-where am I? I-I was just in my room...",
          next: 1,
        },
        {
          text: "2) Fuck off bitch. I'll scream if I want to scream.",
          next: 2,
        },
      ],
    },
    {
      text: "Cult Head: *He leans in and peers intently into your eyes* Hmm your eyes show no light, and so the bind is tight. But what pathetic words for a demon of your stature... Hell burns at the same rate as your evaporating masculinity.",
      choices: [{ text: "Continue...", next: 3 }],
    },
    {
      text: "Cult Head: *He leans in and peers intently into your eyes* Hmm your eyes show no light, and so the bind is tight. But for a demon of your stature to so brazenly speak to a Lord two-hundred years your superior... You must be having trouble grasping reality.",
      choices: [{ text: "Continue...", next: 3 }],
    },
    {
      text: "Cult Head: *His fist lights aflame and he punches you swiftly in the gut* Heal your mind or we will tear your soul for energy. Have the twins check you out. They're in the room to the right of here. We will finish without you...",
      // no choices = end
    },
  ];

  private currentNodeIndex: number = 0;
  private dialogueText!: Phaser.GameObjects.Text;
  private choiceTexts: Phaser.GameObjects.Text[] = [];
  private music!: Phaser.Sound.BaseSound;

  constructor() {
    super({ key: "CultHead" });
  }

  preload() {
    this.load.image("cultHeadConvo", "/assets/cultHead.png");
    this.load.audio("cultHeadMusic", "/assets/music/morbid.mp3");
  }

  create() {
    // Background portrait
    const portrait = this.add
      .image(this.scale.width / 2, this.scale.height / 2, "cultHeadConvo")
      .setOrigin(0.5);
    portrait.displayWidth = this.scale.width;
    portrait.displayHeight = this.scale.height;

    // Dialogue box
    this.add.rectangle(
      this.scale.width / 2,
      this.scale.height - 150,
      this.scale.width,
      250,
      0x000000,
      0.6
    );

    this.dialogueText = this.add.text(150, this.scale.height - 190, "", {
      fontSize: "32px",
      color: "#ffffff",
      wordWrap: { width: this.scale.width - 300 },
    });

    this.music = this.sound.add("cultHeadMusic", { loop: true, volume: 1 });
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
        this.scale.height - 100 + i * 40,
        choice.text,
        { fontSize: "28px", color: "#ffcc00" }
      );
      this.choiceTexts.push(choiceText);
    });
  }
}
