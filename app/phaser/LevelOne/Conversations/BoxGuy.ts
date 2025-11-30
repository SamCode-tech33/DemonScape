import { DialogueNode } from "@/app/components/demonScapeTypes";

export default class BoxGuy extends Phaser.Scene {
  public dialogueNodes: DialogueNode[] = [
    {
      text: "Box Guy: Man I am so high right now..... and an erotic view lies before me...*His smirk grows in intensity* a beautiful day indeed.",
      choices: [
        {
          text: "1) Yeah... beautiful in a debaucherous, sick kind of way.",
          next: 1,
        },
        {
          text: "2) Why don't you go talk to her?",
          next: 2,
        },
      ],
    },
    {
      text: "Box Guy: Exactly! My Man!",
      choices: [
        {
          text: "1) Continue...",
          next: 4,
        },
      ],
    },
    {
      text: "Box Guy: I'm more of watch from the corner kind of demon if you know what I mean.",
      choices: [
        {
          text: "1) Distgusting...",
          next: 3,
        },
        {
          text: "2) Yeah... better not mess with them, the non-orgasming one might kill you.",
          next: 3,
        },
      ],
    },
    {
      text: "Box Guy: Exactly! My Man!",
      choices: [
        {
          text: "1) Continue...",
          next: 4,
        },
      ],
    },
    {
      text: "Box Guy: Man I am so high right now... you could ask me anything... and I wouldn't suspect you of being a Light-Bleached or even a human or some crazy shit like that.",
      choices: [
        {
          text: "1) Yeah I'm not falling for that shit.",
          next: 12,
        },
        {
          text: "2) You mentioned humans. Are there any here?",
          next: 5,
        },
      ],
    },
    {
      text: "Box Guy: Humans? Nooooo they would be killed or possessed immediatly if they are here. Obviously. I saw one in the forest once, I guess there are a few still surviving outside cities and stuff. But damnnnn what a depressing day that was. I was too high to kill him. When I got home, I was so sad that I smoked some more.",
      choices: [
        {
          text: "1) continue...",
          next: 6,
        },
      ],
    },
    {
      text: "Box Guy: Any other brimmmming questions?",
      choices: [
        {
          text: "1) What is a Light-Bleached?",
          next: 7,
        },
        {
          text: "2) Where am I?",
          next: 8,
        },
        {
          text: "3) What do you even do here?",
          next: 9,
        },
        {
          text: "4) What happened to the humans?",
          next: 10,
        },
        {
          text: "5) Do you like tacoes?",
          next: 11,
        },
        {
          text: "6) No.",
          next: 12,
        },
      ],
    },
    {
      text: "Box Guy: They're like that moment you take a huge hit and your mind goesss allll WHITE. I'm sure you know what I mean.",
      choices: [
        {
          text: "1) OK...",
          next: 6,
        },
      ],
    },
    {
      text: "Box Guy: We are in DA CATHEDRAL LE GROUND. It's a flipped over cathedral that is underground. That's right. We don't just like inverted crosses. We like INVERTED CHURCHES. It's a FATTER middle finger one might say. Also great for hotboxing. But we're in a shit poor town my dude. None of the good stuff around here. Mmmmmm actually you have more energy than most in this shithole. Unfortunate your a man...",
      choices: [
        {
          text: "1) OK...",
          next: 6,
        },
      ],
    },
    {
      text: "Box Guy: Who me? I just sit on boxes and get high HAHAHAH. But for real, I am SUPPOSED to be... oh wait that's a secret! Whew, It would have been a sad day if I told you... AND THEN I WOULD HAVE TO SMOKE MORE. And if I got that high I wouldn't be able to see the glorious ass before me. Man you almost got me, but not quite hehehe.",
      choices: [
        {
          text: "1) OK...",
          next: 6,
        },
      ],
    },
    {
      text: "Box Guy: Mostly dead! But we still have the final cleanzzzzing coming up. I'm sad about that though. No more flesh for my tacoes after we finish. Maybe I'll ask Baelzog to make a human farm.... nah his presence is enough to kill people like us. Maybe I'll write a letter...",
      choices: [
        {
          text: "1) OK...",
          next: 6,
        },
      ],
    },
    {
      text: "Box Guy: OHHHH YEAHHHH I was the first to INVERT THAT SHIT. Upside down tacoes with human flesh as meat and that sweet cockroach CRUNCH. Oh! and tomatoes... But mannnn that was a sad day. I was so high that ALFRED STOLE MY BUSINESS IDEA. Cocksucker's rich now.",
      choices: [
        {
          text: "1) OK...",
          next: 6,
        },
      ],
    },
    {
      text: "Box Guy: Great! I've got a fat ass in the orgasmic throes of passion to stare at. Move along.",
    },
  ];

  public currentNodeIndex: number = 0;
  public dialogueText!: Phaser.GameObjects.Text;
  public choiceTexts: Phaser.GameObjects.Text[] = [];
  public music!: Phaser.Sound.BaseSound;
  public boxGuyVoice!: Phaser.Sound.BaseSound;
  public speechInterval: NodeJS.Timeout | null = null;

  constructor() {
    super({ key: "BoxGuy" });
  }

  preload() {
    this.load.image("boxGuyConvo", "/assets/conversations/box-guy.png");
    this.load.audio("boxGuyMusic", "/assets/music/dimension-2.mp3");
    this.load.audio("boxGuyVoice", "/assets/sfx/boxGuyVoice.mp3");
  }

  create() {
    // Background portrait
    const portrait = this.add
      .image(this.scale.width / 2, this.scale.height / 2, "boxGuyConvo")
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

    this.music = this.sound.add("boxGuyMusic", { loop: true, volume: 1 });
    this.music.play();

    this.boxGuyVoice = this.sound.add("boxGuyVoice", { volume: 2 });

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

    this.boxGuyVoice.play({
      loop: true,
      rate: 1.1,
    });

    this.input.keyboard!.once("keydown-SPACE", () => {
      if (this.speechInterval) {
        clearInterval(this.speechInterval);
        this.speechInterval = null;
      }
      this.dialogueText.setText(fullText);
      this.boxGuyVoice.stop();
      this.displayChoices(node);
    });

    this.speechInterval = setInterval(() => {
      if (currentCharIndex >= chars.length) {
        if (this.speechInterval) {
          clearInterval(this.speechInterval);
          this.speechInterval = null;
        }
        this.boxGuyVoice.stop();
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
      // Special spacing for node index 6
      let startY = this.scale.height - 110;
      let spacing = 40;

      if (this.currentNodeIndex === 6) {
        startY = this.scale.height - 220;
        spacing = 35;
      }

      const choiceText = this.add.text(180, startY + i * spacing, choice.text, {
        fontSize: "24px",
        color: "#ffcc00",
        wordWrap: { width: this.scale.width - 300 },
      });
      this.choiceTexts.push(choiceText);
    });
    this.input.keyboard!.on("keydown", this.onChoiceKey, this);
  }
}
