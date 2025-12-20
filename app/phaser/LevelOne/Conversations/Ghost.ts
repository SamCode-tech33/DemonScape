import { DialogueNode } from "@/app/components/demonScapeTypes";
export default class Ghost extends Phaser.Scene {
  public dialogueNodes: DialogueNode[] = [
    {
      text: "YOU TOOK IT FROM ME! MY HUSK! ILL KILL YOU ILL KILL YOU ILL KILL YOU...",
      emote: "*His punches phase right through you*",
      dialogueLine: "",
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
      text: "AHkHEMM *Blood sprays out of his mouth. So you can see me... That means, no that is impossible!",
      emote: "*You whince but it simply phases through your face*",
      dialogueLine: "",
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
      text: "But your energy is demonic. Wait, if your demonic and in a husk with the vision to see me... ARE YOU LIGHT-BLEACHED?",
      emote: "",
      dialogueLine: "",
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
      text: "NO DON'T LEAVE! GIVE IT BACK. THE VOID IS PULLING ME BACK. SLOWLY this world is killing me.",
      emote: "",
      dialogueLine: "",
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
      text: "The physical body blocks spiritual sight unless your a Light-Bleached or powerful demon... DAMN MAELVOTH, I knew he was a fake. Didn't even sense me in the slightest. And now this world is going to kill me. DAMNIT NO ONE IN THIS SHITTY TOWN HAS ENOUGH ENERGY TO SEND ME BACK BETWEEN...let alone see me.",
      emote: "",
      dialogueLine: "",
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
      text: "HAH no. Your eyes tell me you are a demon... or perhaps a Light-Bleached in disguise. But no you have to be a demon. Is your husk short circuiting your control? HAH serves you right for stealing my husk... bitch.",
      emote: "",
      dialogueLine: "",
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
      text: "AHHHHH yes that's it. You are powerful enough to send me back between! And you owe me. It's the least you can do after stealing my husk and damning me to the void... please? I'll serve you for a lifetime.",
      emote: "",
      dialogueLine: "",
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
      text: "OK GREAT! I will follow you until you fix your integration issues! I think I have a few days left yet.",
      emote: "",
      dialogueLine: "",
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
      text: "I'm dead if you are one but I'm also dead if you don't help me... although I've never heard of a Light-Bleached with husk integration problems... so yeah! A bet I'm willing to take.",
      emote: "",
      dialogueLine: "",
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
      text: "Of course, of course...",
      emote: "*He grins, awkwardly expressing subservience*",
      dialogueLine: "",
    },
    {
      text: "HAH your husk integration is truly FUCKED. If you were human your eyes wouldn't be red... dumbass.",
      emote: "",
      dialogueLine: "",
      choices: [
        {
          text: "1) Ok...",
          next: 7,
        },
      ],
    },
    {
      text: "I mean... you can't stop me from following you unless want to risk your own soul to fight me on this plane. HAH but if your that stupid I'll just snatch your husk when you come out... Ahh sorry I shouldn't say that. Hey you'll get used to me. I'm a funny guy!",
      emote: "",
      dialogueLine: "",
      choices: [
        {
          text: "1) Ok... I don't know how to do or even conceptulize that anyways. Fine, but remember the whole servent deal.",
          next: 9,
        },
      ],
    },
  ];
  public currentNodeIndex: number = 0;
  public dialogueText!: Phaser.GameObjects.Text;
  public choiceTexts: Phaser.GameObjects.Text[] = [];
  public music!: Phaser.Sound.BaseSound;
  public ghostVoice!: Phaser.Sound.BaseSound;
  public speechInterval: NodeJS.Timeout | null = null;
  public speakerName!: Phaser.GameObjects.Text;
  public playerSpeaker!: Phaser.GameObjects.Text;

  constructor() {
    super({ key: "Ghost" });
  }

  preload() {
    this.load.image("ghostOneConvo", "/assets/conversations/ghost.png");
    this.load.audio("ghostOneMusic", "/assets/music/mystery.mp3");
    this.load.audio("ghostVoice", "/assets/sfx/ghostVoice.mp3");
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

    this.speakerName = this.add.text(
      60,
      this.scale.height - 278,
      "Blood Ghost:",
      {
        fontFamily: "Mostean",
        fontSize: "52px",
        color: "#EB5E55",
        stroke: "black",
        strokeThickness: 1,
        wordWrap: { width: 100 },
      }
    );

    this.playerSpeaker = this.add.text(60, this.scale.height - 110, "You:", {
      fontFamily: "Mostean",
      fontSize: "52px",
      color: "#ffcc00",
      stroke: "black",
      strokeThickness: 1,
    });

    this.dialogueText = this.add.text(240, this.scale.height - 270, "", {
      fontFamily: "Mostean",
      fontSize: "40px",
      color: "#EB5E55",
      stroke: "black",
      strokeThickness: 1,
      wordWrap: { width: this.scale.width - 300 },
    });

    this.music = this.sound.add("ghostOneMusic", { loop: true, volume: 1 });
    this.music.play();

    this.ghostVoice = this.sound.add("ghostVoice", { volume: 1 });

    // Show first node
    this.showNode(0);
  }
  // Input: pick choices with number keys
  private onChoiceKey(event: KeyboardEvent) {
    const key = parseInt(event.key);
    if (!isNaN(key) && key >= 1 && key <= 9) {
      const choice =
        this.dialogueNodes[this.currentNodeIndex].choices?.[key - 1];
      if (choice) {
        // Remove listener before recursing to next node
        this.input.keyboard!.off("keydown", this.onChoiceKey, this);
        this.showNode(choice.next);
      }
    }
  }

  private showNode(index: number) {
    if (this.speechInterval) {
      clearInterval(this.speechInterval);
    }

    this.currentNodeIndex = index;
    const node = this.dialogueNodes[index];

    // Clear previous text
    this.input.keyboard!.off("keydown", this.onChoiceKey, this);
    this.dialogueText.setText("");
    this.choiceTexts.forEach((c) => c.destroy());
    this.choiceTexts = [];

    // === TYPEWRITER WITH FADE-IN EFFECT ===
    const fullText = node.text;
    const chars = fullText.split("");
    const typeSpeed = 16;
    let currentCharIndex = 0;
    const fadeDuration = 400;

    this.ghostVoice.play({
      loop: true,
      rate: 1.1,
    });

    this.input.keyboard!.once("keydown-SPACE", () => {
      if (this.speechInterval) {
        clearInterval(this.speechInterval);
        this.speechInterval = null;
      }
      this.dialogueText.setText(fullText);
      this.ghostVoice.play({
        loop: false,
      });
      this.displayChoices(node);
    });

    this.speechInterval = setInterval(() => {
      if (currentCharIndex >= chars.length) {
        if (this.speechInterval) {
          clearInterval(this.speechInterval);
          this.speechInterval = null;
        }
        this.ghostVoice.play({
          loop: false,
        });
        this.displayChoices(node);
        return;
      }
      const char = chars[currentCharIndex];
      currentCharIndex++;
      this.dialogueText.setText(this.dialogueText.text + char);
    }, typeSpeed);
  }

  private displayChoices(node: DialogueNode) {
    // Remove old choices
    this.choiceTexts.forEach((c) => c.destroy());
    this.choiceTexts = [];

    // check for end of conversation
    if (!node.choices || node.choices.length === 0) {
      this.add.text(
        300,
        this.scale.height - 110,
        "Press space to exit conversation",
        {
          fontFamily: "Mostean",
          fontSize: "44px",
          color: "#ffcc00",
          stroke: "black",
          strokeThickness: 1,
          wordWrap: { width: this.scale.width - 300 },
        }
      );
      this.input.keyboard!.once("keydown-SPACE", () => {
        this.music.stop();
        this.scene.stop();
        this.scene.resume("SceneOne", { from: "Ghost" });
      });
      return;
    }

    // Show new choices
    node.choices.forEach((choice, i) => {
      const choiceText = this.add.text(
        248,
        this.scale.height - 110 + i * 40,
        choice.text,
        {
          fontFamily: "Mostean",
          fontSize: "32px",
          color: "#ffcc00",
          stroke: "black",
          strokeThickness: 1,
          wordWrap: { width: this.scale.width - 300 },
        }
      );
      this.choiceTexts.push(choiceText);
    });
    this.input.keyboard!.on("keydown", this.onChoiceKey, this);
  }
}
