import { conversationLogic } from "@/app/components/conversationLogic";
import type {
  ConvoSceneState,
  DialogueNode,
} from "@/app/components/demonScapeTypes";
export default class Ghost extends Phaser.Scene implements ConvoSceneState {
  public dialogueNodes: DialogueNode[] = [
    {
      text: "YOU TOOK IT FROM ME! MY HUSK! ILL KILL YOU ILL KILL YOU ILL KILL YOU...",
      emote: "*His punches phase right through you*",
      dialogueLine: "ghostOneVoice",
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
      dialogueLine: "ghostOneVoice",
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
      dialogueLine: "ghostOneVoice",
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
      dialogueLine: "ghostOneVoice",
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
      dialogueLine: "ghostOneVoice",
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
      dialogueLine: "ghostOneVoice",
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
      dialogueLine: "ghostOneVoice",
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
      dialogueLine: "ghostOneVoice",
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
      dialogueLine: "ghostOneVoice",
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
      dialogueLine: "ghostOneVoice",
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
      dialogueLine: "ghostOneVoice",
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
  public voiceDialogue!: Phaser.Sound.BaseSound;
  public speechInterval: NodeJS.Timeout | null = null;
  public speakerText!: Phaser.GameObjects.Text;
  public playerSpeaker!: Phaser.GameObjects.Text;
  public emoteText!: Phaser.GameObjects.Text;
  public emoteBg!: Phaser.GameObjects.Rectangle;
  public dialogueScene: number = 1;
  public fromScene: string = "Ghost";
  public speakerName: string = "Bloody Ghost:";
  public voiceLoop: boolean = true;
  public manyOptionsNode: number = -1;

  constructor() {
    super({ key: "Ghost" });
  }

  preload() {
    this.load.image("ghostOneBg", "/assets/conversations/ghost.png");
    this.load.audio("ghostOneMusic", "/assets/music/mystery.mp3");
    this.load.audio("ghostOneVoice", "/assets/sfx/ghostVoice.mp3");
  }

  create() {
    conversationLogic(this, "#EB5E55", "black", "ghostOneBg", "ghostOneMusic");
  }
}
