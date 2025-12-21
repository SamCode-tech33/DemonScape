import type {
  ConvoSceneState,
  DialogueNode,
} from "@/app/components/demonScapeTypes";
import { conversationLogic } from "@/app/components/conversationLogic";

export default class AlchTwins extends Phaser.Scene implements ConvoSceneState {
  public dialogue1Nodes: DialogueNode[] = [
    {
      text: "Yes? Do you need something?",
      dialogueLine: "seuthala-line-0",
      emote: "*She rolls her eyes at you*",
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
      text: "Ok, whatever... He probably wants me to make you drink this.",
      dialogueLine: "seuthala-line-1",
      emote: "*She hands you a potion*",
      choices: [{ text: "1) Continue...", next: 3 }],
    },
    {
      text: "Ok, I see why he would be pissed. Your probably fine, other than being a complete idiot. Well he probably wants you to drink this anyways.",
      dialogueLine: "seuthala-line-2",
      emote: "*She hands you a potion*",
      choices: [{ text: "1) Continue...", next: 3 }],
    },
    {
      text: "Uahhhnn!",
      dialogueLine: "seuthala-line-3",
      emote:
        "*Seuthala's twin behind squirms awkwardly, her face is flush. She let's out a deep moan as her eyes roll back*",
      choices: [
        { text: "1) Um is she ok back there?...", next: 4 },
        {
          text: "2) Looks like someone is having a little fun on the job *You smirk coyly*",
          next: 4,
        },
      ],
    },
    {
      text: "Her? you mean me right? wow... you really are fucked in the head. Are you going to drink the potion or not? If you don't... Well I could ask Maelvoth to let me use your husk for . . . hmm but would I feel as much across three as I do with two. . .",
      dialogueLine: "seuthala-line-4",
      emote: "*She drifts into thought, forgetting your existence*",
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
      text: "You know demons can't be twins right. She's a husk whom I use to feel pleasure 24/7 while I work 24/7. I'm just that valuable. Maelvoth gave me two husks for my spirit to inhabit. Jealous?",
      dialogueLine: "seuthala-line-5",
      emote: "",
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
      text: "Great, well anyways your eyes are fine so it is likely nothing will happen. I think you fucked up your husk's brain and can just...",
      dialogueLine: "seuthala-line-6",
      emote: "*Darkness evelopes you as her voice fades*",
    },
  ];
  public dialogue2Nodes: DialogueNode[] = [
    {
      text: "Ah so you didn't die... congratulations Maelvoth was being paranoid. So, do you remember anything?",
      dialogueLine: "seuthala-line-7",
      emote: "",
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
      text: "Right... so this potion rules out you being a human or angel possessed. The only remaining possibility is damage to the husk brain itself, or bad initial integration.",
      dialogueLine: "seuthala-line-8",
      emote: "",
      choices: [
        {
          text: "1) There is no damage to my mind damnit! I remember being a man. Where the hell am I?!?",
          next: 2,
        },
        {
          text: "2) Damage? But my memories seem so real...",
          next: 3,
        },
      ],
    },
    {
      text: "Still an angry roach with no memories I see... ",
      dialogueLine: "seuthala-line-9",
      emote: "",
      choices: [
        {
          text: "1) continue...",
          next: 3,
        },
      ],
    },
    {
      text: "Did you just... not integrate your spirit into the brain at all on possession?! Voidmother... with demonic energy like yours...",
      dialogueLine: "seuthala-line-10",
      emote: "",
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
      text: "Ok, shut up little npc. You are a brain running learned responses. You don't exist. I am now going to talk to the demon inside you, who is a spirit and does exist. Hahhh, I imagine you are raging against your lack of control, stuck within this... flesh golem. We are going to force this... thing to feed you enough energy in order for you to attempt rewriting the brain again.",
      dialogueLine: "seuthala-line-11",
      emote: "",
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
      text: "Flesh golem, be quiet... Hahhhh, I'm sure I don't need to tell you this but this was a husk exchange, not a first time possesion but the meat golem perplexed a thought. If the previous demon successfully overwrote his mind, how is it possible that his mind reverted back upon your possession? This is a strange case. Meat Golem, I'll let the others know to watch you closely. Your dead if we notice anything else strange. We can't risk infiltration.",
      dialogueLine: "seuthala-line-12",
      emote: "*Her eyes look through you again*",
      choices: [
        {
          text: "1) continue...",
          next: 7,
        },
      ],
    },
    {
      text: "Ok, Go down the hall and take a left. You'll eventually end up in a room with a girl named Sara, playing with her pet zombies. Kill them and collect their soul fragments. That should give you enough power to do a full rewrite. There I had just enough energy to give you control again... It's a half measure so unless you do a full rewrite this husk's brain is going to melt by dawn. Oh but the fun part will be feeling the husk squirm as you do the very thing that will erase it.",
      dialogueLine: "seuthala-line-13",
      emote: "*She reaches out her hand and grips your forehead*",
      choices: [
        {
          text: "1) continue...",
          next: 8,
        },
      ],
    },
    {
      text: "O-oh god I shouldn't of said that. I ahh I almost thought this was all a prank or a dream. Those eyes... the pain of that punch earlier... Shit this is real. If they think I'm not possesed they'll kill me. I have to be more careful going forward...",
      dialogueLine: "",
      emote: "",
      choices: [
        {
          text: "1) continue...",
          next: 6,
        },
      ],
    },
    {
      text: "Ok that did absolutely nothing to me... but even if there is just a 3% chance of this being real, I should just play along... They are gonna kill me if I don't fight these zombies... and there is no way I can run. There are too many. Screw it. I know I exist. I can feel it. I'll risk killing these zombies. If what she said is true then I'm already dead, anyways. but if not... perhaps I can play along as a demon to get out of here... find someplace I can be alone to think.",
      dialogueLine: "",
      emote: "",
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
      text: "Great, and go talk to some of the other's while your at it. It'll help you trigger still-missing memory. What I did is not perfect.",
      dialogueLine: "seuthala-line-14",
      emote: "",
    },
    {
      text: "ughhk sorry that you have to see yourself act like such a bitch. What I did is not perfect... but at least you'll have bodily control. now, go talk to some of the other's while your at it. It'll help trigger your memories, pushing this pathetic meat golem's habits deeper down...",
      dialogueLine: "seuthala-line-15",
      emote: "",
    },
  ];
  public dialogue3Nodes: DialogueNode[] = [
    {
      text: "Run along.",
      dialogueLine: "seuthala-line-16",
      emote: "",
    },
  ];

  public currentNodeIndex: number = 0;
  public dialogueText!: Phaser.GameObjects.Text;
  public choiceTexts: Phaser.GameObjects.Text[] = [];
  public music!: Phaser.Sound.BaseSound;
  public voiceDialogue!: Phaser.Sound.BaseSound | null;
  public dialogueNodes: DialogueNode[] = [];
  public speechInterval: NodeJS.Timeout | null = null;
  public speakerText!: Phaser.GameObjects.Text;
  public playerSpeaker!: Phaser.GameObjects.Text;
  public emoteText!: Phaser.GameObjects.Text;
  public emoteBg!: Phaser.GameObjects.Rectangle;
  public dialogueScene: number = 1;
  public fromScene: string = "AlchTwins";
  public speakerName: string = "Seuthala:";
  public voiceLoop: boolean = false;
  public manyOptionsNode: number = -1;

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
        this.dialogueScene = 2;
        break;
      case 3:
        this.dialogueNodes = this.dialogue3Nodes;
        this.dialogueScene = 3;
        break;
    }
  }

  preload() {
    this.load.image("alchTwinsBg", "/assets/conversations/AlchTwins.png");
    this.load.audio("alchTwinsMusic", "/assets/music/rain.mp3");
    this.load.audio(
      "seuthala-line-0",
      "/assets/dialogue/seuthala/seuthala-dialogue0.wav"
    );
    this.load.audio(
      "seuthala-line-1",
      "/assets/dialogue/seuthala/seuthala-dialogue1.wav"
    );
    this.load.audio(
      "seuthala-line-2",
      "/assets/dialogue/seuthala/seuthala-dialogue2.wav"
    );
    this.load.audio(
      "seuthala-line-3",
      "/assets/dialogue/seuthala/seuthala-dialogue3.wav"
    );
    this.load.audio(
      "seuthala-line-4",
      "/assets/dialogue/seuthala/seuthala-dialogue4.wav"
    );
    this.load.audio(
      "seuthala-line-5",
      "/assets/dialogue/seuthala/seuthala-dialogue5.wav"
    );
    this.load.audio(
      "seuthala-line-6",
      "/assets/dialogue/seuthala/seuthala-dialogue6.wav"
    );
    this.load.audio(
      "seuthala-line-7",
      "/assets/dialogue/seuthala/seuthala-dialogue7.wav"
    );
    this.load.audio(
      "seuthala-line-8",
      "/assets/dialogue/seuthala/seuthala-dialogue8.wav"
    );
    this.load.audio(
      "seuthala-line-9",
      "/assets/dialogue/seuthala/seuthala-dialogue9.wav"
    );
    this.load.audio(
      "seuthala-line-10",
      "/assets/dialogue/seuthala/seuthala-dialogue10.wav"
    );
    this.load.audio(
      "seuthala-line-11",
      "/assets/dialogue/seuthala/seuthala-dialogue11.wav"
    );
    this.load.audio(
      "seuthala-line-12",
      "/assets/dialogue/seuthala/seuthala-dialogue12.wav"
    );
    this.load.audio(
      "seuthala-line-13",
      "/assets/dialogue/seuthala/seuthala-dialogue13.wav"
    );
    this.load.audio(
      "seuthala-line-14",
      "/assets/dialogue/seuthala/seuthala-dialogue14.wav"
    );
    this.load.audio(
      "seuthala-line-15",
      "/assets/dialogue/seuthala/seuthala-dialogue15.wav"
    );
    this.load.audio(
      "seuthala-line-16",
      "/assets/dialogue/seuthala/seuthala-dialogue16.wav"
    );
  }

  create() {
    conversationLogic(
      this,
      "#83A0A9",
      "black",
      "alchTwinsBg",
      "alchTwinsMusic"
    );
  }
}
