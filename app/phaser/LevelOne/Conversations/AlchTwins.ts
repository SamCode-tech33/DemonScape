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
  private dialogue1Nodes: DialogueNode[] = [
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

  private dialogue2Nodes: DialogueNode[] = [
    {
      text: "Seuthala: Ah so you didn't die... congratulations Maelvoth was being paranoid. So, do you remember anything?",
      choices: [
        {
          text: "1) No nothing. I still don't know what is going on here.",
          next: 1,
        },
        {
          text: "2) Hell were you trying to kill me with that thing?!",
          next: 2,
        },
      ],
    },
    {
      text: "Seuthala: Right... so this potion rules out you being a human or angel possesion. The only remaining possibility is damage to the husk brain itself.",
      choices: [
        {
          text: "1) There is no damage to my mind damnit! I remember being a man. Where the hell am I?!?",
          next: 3,
        },
        {
          text: "2) Damage? But my memories seem so real...",
          next: 3,
        },
      ],
    },
    {
      text: "Seuthala: Still an angry roach with no memories I see... ",
      choices: [
        {
          text: "1) continue...",
          next: 1,
        },
      ],
    },
    {
      text: "Seuthala: Did you just... not integrate your spirit into the brain at all on possession?! Voidmother... with demonic energy like yours...",
      choices: [
        {
          text: "1) I didn't integrate into shit. I am me and I was me like this when I was born.",
          next: 4,
        },
        {
          text: "2) This makes no sense. I am me!",
          next: 4,
        },
      ],
    },
    {
      text: "Seuthala: Ok, shut the fuck up little npc. You are a brain running learned responses. You don't exist. I am now going to talk to the demon inside you, who is a spirit and does exist. *Sigh* I imagine you are raging against your lack of control, stuck within this... flesh golem. We are going to force this... thing to feed you enough energy in order for you to attempt rewriting the brain again.",
      choices: [
        {
          text: "1) Hold on. If I don't exist, then why don't I have memories up until that ceremony or whatever. That's when I was 'possessed' right?",
          next: 5,
        },
        {
          text: "2) *Say nothing and let her continue*",
          next: 6,
        },
      ],
    },
    {
      text: "Seuthala: Flesh golem, be quiet... *Sigh* I'm sure I don't need to tell you this but this was a husk exchange, not a first time possesion but the meat golem perplexed a thought. If the previous demon successfully overwrote his mind, how is it possible that his mind reverted back upon your possession? This is a strange case. Meat Golem, I'll let the others know to watch you closely. Your dead if we notice anything else strange. *Her eyes look through you again* I'm sorry we can't risk infiltration.",
      choices: [
        {
          text: "1) continue...",
          next: 7,
        },
      ],
    },
    {
      text: "Seuthala: Ok, Go down the hall and take a left. You'll eventually end up in a room with a girl named Sara, playing with her pet zombies. Kill them and collect their soul fragments. That should give you enough power to gain control again. *She reaches out her hand and grips your forehead* There I had just enough energy to give you control again... It's a half measure so unless you do a full rewrite this husk's brain is going to melt by dawn. Oh but the fun part will be feeling the husk squirm as you do the very thing that will erase it.",
      choices: [
        {
          text: "1) continue...",
          next: 8,
        },
      ],
    },
    {
      text: "You (thinking): O-oh god I shouldn't of said that. I ahh I almost thought this was all a prank or a dream. Those eyes... the pain of that punch earlier... Shit this is real. If they think I'm not possesed they'll kill me. I have to be more careful going forward...",
      choices: [
        {
          text: "1) continue...",
          next: 6,
        },
      ],
    },
    {
      text: "You (thinking): Ok that did absolutely nothing to me... but even if there is just a 3% chance of this being real, I should just play along... They are gonna kill me if I don't fight these zombies... and there is no way I can run. There are too many. Screw it. I know I exist. I can feel it. I'll risk killing these zombies. If what she said is true anyways then I'm already dead. but if not... perhaps I can play along as a demon to get out of here... find someplace I can be alone to think. First things first, I got to get out of this place.",
      choices: [
        {
          text: "1) I'll finish this up quickly...",
          next: 9,
        },
        {
          text: "2) I uh-yeah so good having control again *You wink*",
          next: 10,
        },
      ],
    },
    {
      text: "Seuthala: Great, and go talk to some of the other's while your at it. It'll help you trigger still-missing memory. What I did is not perfect.",
    },
    {
      text: "Seuthala: ughhk sorry you see yourself act like such a bitch. What I did is not perfect... but at least you'll have bodily control. now, go talk to some of the other's while your at it. It'll help trigger your memories, pushing this pathetic meat golem's habits deeper down...",
    },
  ];

  private dialogue3Nodes: DialogueNode[] = [
    {
      text: "Seuthala: Run along.",
    },
  ];

  private currentNodeIndex: number = 0;
  private dialogueText!: Phaser.GameObjects.Text;
  private choiceTexts: Phaser.GameObjects.Text[] = [];
  private music!: Phaser.Sound.BaseSound;
  private dialogueNodes: DialogueNode[] = [];

  constructor() {
    super({ key: "AlchTwins" });
  }

  init(data: { alchSceneNum: number }) {
    switch (data.alchSceneNum) {
      case 1:
        this.dialogueNodes = this.dialogue1Nodes;
        break;
      case 2:
        this.dialogueNodes = this.dialogue2Nodes;
        break;
      case 3:
        this.dialogueNodes = this.dialogue3Nodes;
        break;
    }
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
        this.scene.resume("SceneOne", { from: "AlchTwins" });
      });
      return;
    }

    // Show new choices
    node.choices.forEach((choice, i) => {
      const choiceText = this.add.text(
        180,
        this.scale.height - 96 + i * 40,
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
