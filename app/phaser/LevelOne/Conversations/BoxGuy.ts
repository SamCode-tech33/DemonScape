import { conversationLogic } from "@/app/components/conversationLogic";
import type {
  ConvoSceneState,
  DialogueNode,
} from "@/app/components/demonScapeTypes";

export default class BoxGuy extends Phaser.Scene implements ConvoSceneState {
  public dialogueNodes: DialogueNode[] = [
    {
      text: "Man I am so high right now..... and an erotic view lies before me... a beautiful day indeed.",
      emote: "*His smirk grows in intensity*",
      dialogueLine: "boxGuyVoice",
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
      text: "Exactly! My Man!",
      emote: "",
      dialogueLine: "boxGuyVoice",
      choices: [
        {
          text: "1) Continue...",
          next: 4,
        },
      ],
    },
    {
      text: "I'm more of watch from the corner kind of demon if you know what I mean.",
      emote: "",
      dialogueLine: "boxGuyVoice",
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
      text: "Exactly! My Man!",
      emote: "",
      dialogueLine: "boxGuyVoice",
      choices: [
        {
          text: "1) Continue...",
          next: 4,
        },
      ],
    },
    {
      text: "Man I am so high right now... you could ask me anything... and I wouldn't suspect you of being a Light-Bleached or even a human or some crazy shit like that.",
      emote: "",
      dialogueLine: "boxGuyVoice",
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
      text: "Humans? Nooooo they would be killed or possessed immediatly if they are here. Obviously. I saw one in the forest once, I guess there are a few still surviving outside cities and stuff. But damnnnn what a depressing day that was. I was too high to kill him. When I got home, I was so sad that I smoked some more.",
      emote: "",
      dialogueLine: "boxGuyVoice",
      choices: [
        {
          text: "1) continue...",
          next: 6,
        },
      ],
    },
    {
      text: "Any other brimmmming questions?",
      emote: "",
      dialogueLine: "boxGuyVoice",
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
      text: "They're like that moment you take a huge hit and your mind goesss allll WHITE. I'm sure you know what I mean.",
      emote: "",
      dialogueLine: "boxGuyVoice",
      choices: [
        {
          text: "1) OK...",
          next: 6,
        },
      ],
    },
    {
      text: "We are in DA CATHEDRAL LE GROUND. It's a flipped over cathedral that is underground. That's right. We don't just like inverted crosses. We like INVERTED CHURCHES. It's a FATTER middle finger one might say. Also great for hotboxing. But we're in a shit poor town my dude. None of the good stuff around here. Mmmmmm actually you have more energy than most in this shithole. Unfortunate your a man...",
      emote: "",
      dialogueLine: "boxGuyVoice",
      choices: [
        {
          text: "1) OK...",
          next: 6,
        },
      ],
    },
    {
      text: "Who me? I just sit on boxes and get high HAHAHAH. But for real, I am SUPPOSED to be... oh wait that's a secret! Whew, It would have been a sad day if I told you... AND THEN I WOULD HAVE TO SMOKE MORE. And if I got that high I wouldn't be able to see the glorious ass before me. Man you almost got me, but not quite hehehe.",
      emote: "",
      dialogueLine: "boxGuyVoice",
      choices: [
        {
          text: "1) OK...",
          next: 6,
        },
      ],
    },
    {
      text: "Mostly dead! But we still have the final cleanzzzzing coming up. I'm sad about that though. No more flesh for my tacoes after we finish. Maybe I'll ask Baelzog to make a human farm.... nah his presence is enough to kill people like us. Maybe I'll write a letter...",
      emote: "",
      dialogueLine: "boxGuyVoice",
      choices: [
        {
          text: "1) OK...",
          next: 6,
        },
      ],
    },
    {
      text: "OHHHH YEAHHHH I was the first to INVERT THAT SHIT. Upside down tacoes with human flesh as meat and that sweet cockroach CRUNCH. Oh! and tomatoes... But mannnn that was a sad day. I was so high that ALFRED STOLE MY BUSINESS IDEA. Cocksucker's rich now.",
      emote: "",
      dialogueLine: "boxGuyVoice",
      choices: [
        {
          text: "1) OK...",
          next: 6,
        },
      ],
    },
    {
      text: "Great! I've got a fat ass in the orgasmic throes of passion to stare at. Move along.",
      emote: "",
      dialogueLine: "boxGuyVoice",
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
  public fromScene: string = "BoxGuy";
  public speakerName: string = "Random Box Guy:";
  public voiceLoop: boolean = true;
  public manyOptionsNode: number = 6;

  constructor() {
    super({ key: "BoxGuy" });
  }

  preload() {
    this.load.image("boxGuyBg", "/assets/conversations/box-guy.png");
    this.load.audio("boxGuyMusic", "/assets/music/dimension-2.mp3");
    this.load.audio("boxGuyVoice", "/assets/sfx/boxGuyVoice.mp3");
  }

  create() {
    conversationLogic(this, "#F96F5D", "black", "boxGuyBg", "boxGuyMusic");
  }
}
