import type {
  PlayerStats,
  DialogueNode,
  ConvoSceneState,
} from "@/app/components/demonScapeTypes";
import { conversationLogic } from "@/app/components/conversationLogic";
export default class SaraOne extends Phaser.Scene implements ConvoSceneState {
  public dialogue1Nodes: DialogueNode[] = [
    {
      text: "ughh what? I'm busy.",
      emote: "",
      dialogueLine: "sara-line-0",
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
      text: "That bitch whore... She's jealous of my skill. Damnit. acting like that... look, your husk is probably short-circuiting your conciousness...",
      emote: "",
      dialogueLine: "sara-line-1",
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
      text: "Yeah I don't care about any of that. Damnit your husk is probably short-circuiting your conciousness...",
      emote: "",
      dialogueLine: "sara-line-2",
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
      text: "Oh so she probably gave you temporary control back... pathetic that you messed up something so basic.",
      emote: "*She smirks*",
      dialogueLine: "sara-line-3",
      choices: [{ text: "1) Continue...", next: 5 }],
    },
    {
      text: "It clearly isn't and neither is your logic. Tell me, is it more likely that every being in this room is crazy and just YOU are sane or is it more likely your the crazy one? Take all the time you need.",
      emote: "",
      dialogueLine: "sara-line-4",
      choices: [
        {
          text: "1) And if you gaze long enough into the abyss of collective folly, you may find that you alone still see clearly.",
          next: 6,
        },
      ],
    },
    {
      text: "Damnit, do you know how long it took me to program these soul fragments to fight... ughh fine, Maelvoth would have just killed you instead of making you drink that potion, but you have quite a lot of demonic energy, which makes it even stranger that you didn't integrate the possession correctly...",
      emote: "",
      dialogueLine: "sara-line-5",
      choices: [{ text: "1) Continue...", next: 7 }],
    },
    {
      text: "Ok Mr. Nietzsche... Look, your spirit is filtered through the mind's circuits. Either you didn't properly rewrite the brain on possesion... or damnit who prepared this body for you? Right you wouldn't know...",
      emote: "",
      dialogueLine: "sara-line-6",
      choices: [{ text: "1) Continue...", next: 5 }],
    },
    {
      text: "Maelvoth probably assumes he'll be killed by his superiors if he killed you before the final cleansing. Damn politics... I'll let you kill them, but I'm activating them. I'm sure if mere zombies are able to kill you, no one will complain... good luck.",
      emote: "",
      dialogueLine: "sara-line-7",
    },
  ];
  public dialogue2Nodes: DialogueNode[] = [
    {
      text: "Go on now. Defeat my pets if you can. Be warned, they'll attack you upon your first hit.",
      emote: "",
      dialogueLine: "sara-line-8",
    },
  ];
  public dialogue3Nodes: DialogueNode[] = [
    {
      text: "Ohhhh, did I forget to mention, there is... one more. Careful though, he's an angry boy.",
      emote: "*Sara Winks at you*",
      dialogueLine: "sara-line-9",
    },
  ];
  public dialogue4Nodes: DialogueNode[] = [
    {
      text: "Wow, you beat them. Ok you've only proven your stronger than a human... and you had to waste my pets for it... anyways, you probably felt demonic energy enter your body as you fought. Go report to Maelvoth that you've gained full control again. And leave me be.",
      emote: "*She sighs*",
      dialogueLine: "sara-line-10",
      choices: [
        {
          text: "1) Yes... I am um in control fully once again.",
          next: 1,
        },
        {
          text: "2) What the hell was that last one. Were you trying to kill me?!",
          next: 2,
        },
      ],
    },
    {
      text: "...I hope you remember how to fight. Heheheh you actually jumped on his head, moron. unbelievable we are saving you. At least learn some magic, find a scroll or something.",
      emote: "",
      dialogueLine: "sara-line-11",
    },
    {
      text: "Yes, and if you had died to a mere Zombie, no one would have cared.",
      emote: "",
      dialogueLine: "sara-line-12",
      choices: [
        {
          text: "1) Continue...",
          next: 1,
        },
      ],
    },
  ];

  public dialogueNodes: DialogueNode[] = [];
  public currentNodeIndex: number = 0;
  public dialogueText!: Phaser.GameObjects.Text;
  public choiceTexts: Phaser.GameObjects.Text[] = [];
  public music!: Phaser.Sound.BaseSound;
  public voiceDialogue: Phaser.Sound.BaseSound | null = null;
  public speechInterval: NodeJS.Timeout | null = null;
  public bossFight: boolean = false;
  public speakerText!: Phaser.GameObjects.Text;
  public playerSpeaker!: Phaser.GameObjects.Text;
  public emoteText!: Phaser.GameObjects.Text;
  public emoteBg!: Phaser.GameObjects.Rectangle;
  public dialogueScene: number = 1;
  public fromScene: string = "SaraOne";
  public speakerName: string = "Sara:";
  public voiceLoop: boolean = false;
  public manyOptionsNode: number = 0;
  playerStats!: PlayerStats;

  constructor() {
    super({ key: "SaraOne" });
  }

  init(data: { saraOneSceneNum: number; playerStats: PlayerStats }) {
    switch (data.saraOneSceneNum) {
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
        this.bossFight = true;

        this.playerStats = {
          health: data.playerStats.health ?? 50,
          maxHealth: data.playerStats.maxHealth ?? 50,
          magic: data.playerStats.magic ?? 20,
          maxMagic: data.playerStats.maxMagic ?? 20,
        };

        break;
      case 4:
        this.dialogueNodes = this.dialogue4Nodes;
        this.dialogueScene = 4;
        break;
    }
  }

  preload() {
    this.load.image("saraOneBg", "/assets/conversations/sara.png");
    this.load.audio("saraOneMusic", "/assets/music/fogTrees.mp3");
    this.load.audio("sara-line-0", "/assets/dialogue/sara/sara-dialogue1.wav");
    this.load.audio("sara-line-1", "/assets/dialogue/sara/sara-dialogue2.wav");
    this.load.audio("sara-line-2", "/assets/dialogue/sara/sara-dialogue3.wav");
    this.load.audio("sara-line-3", "/assets/dialogue/sara/sara-dialogue4.wav");
    this.load.audio("sara-line-4", "/assets/dialogue/sara/sara-dialogue5.wav");
    this.load.audio("sara-line-5", "/assets/dialogue/sara/sara-dialogue6.wav");
    this.load.audio("sara-line-6", "/assets/dialogue/sara/sara-dialogue7.wav");
    this.load.audio("sara-line-7", "/assets/dialogue/sara/sara-dialogue8.wav");
    this.load.audio("sara-line-8", "/assets/dialogue/sara/sara-dialogue9.wav");
    this.load.audio("sara-line-9", "/assets/dialogue/sara/sara-dialogue10.wav");
    this.load.audio(
      "sara-line-10",
      "/assets/dialogue/sara/sara-dialogue11.wav"
    );
    this.load.audio(
      "sara-line-11",
      "/assets/dialogue/sara/sara-dialogue12.wav"
    );
    this.load.audio(
      "sara-line-12",
      "/assets/dialogue/sara/sara-dialogue13.wav"
    );
  }

  create() {
    conversationLogic(this, "pink", "black", "saraOneBg", "saraOneMusic");
  }
}
