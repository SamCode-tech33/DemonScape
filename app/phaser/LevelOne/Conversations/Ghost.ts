import Phaser from "phaser";

interface DialogueChoice {
  text: string;
  next: number; // index of next dialogue node
}

interface DialogueNode {
  text: string;
  choices?: DialogueChoice[];
}

export default class Ghost extends Phaser.Scene {
  private dialogueNodes: DialogueNode[] = [
    {
      text: "Blood Ghost: YOU TOOK IT FROM ME! MY HUSK! ILL KILL YOU ILL KILL YOU ILL KILL YOU... *His punches phase right through you*",
      choices: [
        {
          text: "1) Whoh what the hell are you?",
          next: 1,
        },
        {
          text: "2) HAH you can't even touch me! Wierd though... you look like you would hit me or... heheh splash me maybe.",
          next: 1,
        },
      ],
    },
    {
      text: "Blood Ghost: AHkHEMM *Blood sprays out of his mouth. *You whince but it simply phases through your face* So you can see me... That means, no that is impossible!",
      choices: [
        {
          text: "1) What is impossible? Some other guy seemed surprised I saw him too",
          next: 2,
        },
        {
          text: "2) I'm full of possibilities. It's possible I might just walk away right now...",
          next: 3,
        },
      ],
    },
    {
      text: "Blood Ghost: But your energy is demonic. Wait, if your demonic and in a husk with the vision to see me... ARE YOU LIGHT-BLEACHED?",
      choices: [
        {
          text: "1) Ok what the hell does 'Light-Bleached' mean? No one will give me a straight answer.",
          next: 4,
        },
        {
          text: "2) whoh I have heard that phrase before... But wait, what do you mean? Do demons normally not see um... spirits I guess?",
          next: 4,
        },
      ],
    },
    {
      text: "Blood Ghost: NO DON'T LEAVE! GIVE IT BACK. THE VOID IS PULLING ME BACK. SLOWLY this world is killing me.",
      choices: [
        {
          text: "1) I'm pretty sure I am human. This body is mine.",
          next: 5,
        },
        {
          text: "2) Wait why can't other demons see you? That doesn't make any sense.",
          next: 4,
        },
      ],
    },
    {
      text: "Blood Ghost: The physical body blocks spiritual sight unless your a Light-Bleached or powerful demon... DAMN MAELVOTH, I knew he was a fake. Didn't even sense me in the slightest. And now this world is going to kill me. DAMNIT NO ONE IN THIS SHITTY TOWN HAS ENOUGH ENERGY TO SEND ME BACK BETWEEN...let alone see me.",
      choices: [
        {
          text: "1) Hah, but I can see you.",
          next: 6,
        },
        {
          text: "2) You still haven't told me what Light-Bleached is... this is starting to piss me off.",
          next: 6,
        },
      ],
    },
    {
      text: "Blood Ghost: HAH no. Your eyes tell me you are a demon... or perhaps a Light-Bleached in disguise. But no you have to be a demon. Is your husk short circuiting your control? HAH serves you right for stealing my husk... bitch.",
      choices: [
        {
          text: "1) But you just said earlier that demons can't see you, which doesn't make any sense by the way.",
          next: 6,
        },
        {
          text: "2) So what does Light-Bleached even mean?",
          next: 6,
        },
      ],
    },
    {
      text: "Blood Ghost: AHHHHH yes that's it. You are powerful enough to send me back between! And you owe me. It's the least you can do after stealing my husk and damning me to the void... please? I'll serve you for a lifetime.",
      choices: [
        {
          text: "1) A servent for life you say... hmmm that sounds nice but I don't even know what the 'between' is. Obviously I don't know how to send you there.",
          next: 7,
        },
        {
          text: "2) But what if I'm not a demon, but a Light-Bleached?",
          next: 8,
        },
      ],
    },
    {
      text: "Blood Ghost: OK GREAT! I will follow you until you fix your integration issues! I think I have a few days left yet.",
      choices: [
        {
          text: "1) Nah I refuse, I don't need some globby blood ghost melting thing or whatever following me around. That shit creeps me out.",
          next: 11,
        },
        {
          text: "2) Ok. fine but I'll remember that eternal servant deal we have going on.",
          next: 9,
        },
      ],
    },
    {
      text: "Blood Ghost: I'm dead if you are one but I'm also dead if you don't help me... although I've never heard of a Light-Bleached with husk integration problems... so yeah! A bet I'm willing to take.",
      choices: [
        {
          text: "1) Your still not going to tell me what a light-bleached is are you?",
          next: 7,
        },
        {
          text: "2) And what if I turn out to be a human?",
          next: 10,
        },
      ],
    },
    {
      text: "Blood Ghost: Of course, of course... *He grins, awkwardly expressing subservience*",
    },
    {
      text: "Blood Ghost: HAH your husk integration is truly FUCKED. If you were human your eyes wouldn't be red... dumbass.",
      choices: [
        {
          text: "1) Ok...",
          next: 7,
        },
      ],
    },
    {
      text: "Blood Ghost: I mean... you can't stop me from following you unless want to risk your own soul to fight me on this plane. HAH but if your that stupid I'll just snatch your husk when you come out... Ahh sorry I shouldn't say that. Hey you'll get used to me. I'm a funny guy!",
      choices: [
        {
          text: "1) Ok... I don't know how to do or even conceptulize that anyways. Fine, but remember the whole servent deal.",
          next: 9,
        },
      ],
    },
  ];

  private currentNodeIndex: number = 0;
  private dialogueText!: Phaser.GameObjects.Text;
  private choiceTexts: Phaser.GameObjects.Text[] = [];
  private music!: Phaser.Sound.BaseSound;

  constructor() {
    super({ key: "Ghost" });
  }

  preload() {
    this.load.image("ghostOneConvo", "/assets/conversations/ghost.png");
    this.load.audio("ghostOneMusic", "/assets/music/mystery.mp3");
  }

  create() {
    // Background portrait
    const portrait = this.add
      .image(this.scale.width / 2, this.scale.height / 2, "ghostOneConvo")
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

    this.music = this.sound.add("ghostOneMusic", { loop: true, volume: 1 });
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
        this.scale.height - 140 + i * 56,
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
