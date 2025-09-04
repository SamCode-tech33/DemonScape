import Phaser from "phaser";

interface DialogueChoice {
  text: string;
  next: number; // index of next dialogue node
}

interface DialogueNode {
  text: string;
  choices?: DialogueChoice[];
}

export default class AlchTwins extends Phaser.Scene {
  private dialogueNodes: DialogueNode[] = [
    {
      text: "Seuthala: *Seuthala rolls her eyes at you* Yes? Do you need something?",
      choices: [
        {
          text: "1) U-um I uh don't know what's happening to me. It's all so creepy. Where is my house?",
          next: 1,
        },
        {
          text: "2) Some annoying old man told me to come to you... I'm going along with it because it smells like moth-balls over there.",
          next: 2,
        },
      ],
    },
    {
      text: "Seuthala: Ok, whatever... He probably wants me to make you drink this *She hands you a potion*",
      choices: [{ text: "1) Continue...", next: 3 }],
    },
    {
      text: "Seuthala: Ok, I see why he would be pissed. Your probably fine, other than being a complete idiot. Well he probably wants you to drink this anyways. *She hands you a potion*",
      choices: [{ text: "1) Continue...", next: 3 }],
    },
    {
      text: "*Seuthala's twin behind squirms awkwardly, her face is flush. She let's out a deep moan as her eyes roll back* Uahhhn!",
      choices: [
        { text: "1) Um is she ok back there?...", next: 4 },
        {
          text: "2) Looks like someone is having a little fun on the job *You smirk coyly*",
          next: 4,
        },
      ],
    },
    {
      text: "Seuthala: Her? you mean me right? wow... you really are fucked in the head. Are you gonna drink the potion or what? If you don't... Well I could ask Maelvoth to let me use your husk for . . . hmm but would I feel as much across three as I do with two. . . *she drifts into thought, forgetting your existence*",
      choices: [
        {
          text: "1) Me? u-um what does that mean? I mean are you like... Wait what?",
          next: 5,
        },
        {
          text: "2) Yeah I don't really give a flying fuck about whatever kinky shit is going on in there *You grab the potion from her hands and down it in one gulp*",
          next: 6,
        },
      ],
    },
    {
      text: "Seuthala: You know demons can't be twins right. She's a husk whom I use to feel pleasure 24/7 while I work 24/7. I'm just that valuable. Maelvoth gave me two husks for my spirit to inhabit. Jealous?",
      choices: [
        {
          text: "1) W-well um that is all fine and all. I'm just gonna leave now *Don't drink the potion*",
          next: 6,
        },
        {
          text: "2) I see... well nothing better than a random potion from a degenerate demon... *You take the potion and drink it hesitantly*",
          next: 6,
        },
      ],
    },
    {
      text: "Seuthala: Great, well anyways your eyes are fine so it is likely nothing will happen. I think you fucked up your husk's brain and can just... *Darkness evelopes you as her voice fades*",
    },
  ];

  private currentNodeIndex: number = 0;
  private dialogueText!: Phaser.GameObjects.Text;
  private choiceTexts: Phaser.GameObjects.Text[] = [];
  private music!: Phaser.Sound.BaseSound;

  constructor() {
    super({ key: "AlchTwins" });
  }

  preload() {
    this.load.image("AlchTwinsConvo", "/assets/conversations/AlchTwins.png");
    this.load.audio("TwinDemonsMusic", "/assets/music/rain.mp3");
  }

  create() {
    // Background portrait
    const portrait = this.add
      .image(this.scale.width / 2, this.scale.height / 2, "AlchTwinsConvo")
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

    this.music = this.sound.add("TwinDemonsMusic", { loop: true, volume: 1 });
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
