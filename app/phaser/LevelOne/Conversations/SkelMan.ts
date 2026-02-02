import { conversationLogic } from "@/app/components/conversationLogic";
import type {
  ConvoSceneState,
  DialogueNode,
} from "@/app/components/demonScapeTypes";
export default class SkelMan extends Phaser.Scene implements ConvoSceneState {
  public dialogueNodes: DialogueNode[] = [
    {
      text: "WAAAAAAZZZZZZZUUUUUPPPPPPPP?",
      emote: "",
      dialogueLine: "SkelManVoice",
      choices: [
        {
          text: "1) And now there is a talking skeleton... I'm insane. I hope there is a lot of padding in my crazy room.",
          next: 1,
        },
        {
          text: "2) A-a talking skeleton? *you back up slowly* uh hi...",
          next: 1,
        },
      ],
    },
    {
      text: "WHHHAATTT?! you can see me?",
      emote: "",
      dialogueLine: "SkelManVoice",
      choices: [
        {
          text: "1) Yes and you are very ugly.",
          next: 2,
        },
        {
          text: "2) Should I not be able to?",
          next: 3,
        },
      ],
    },
    {
      text: "GEHEHEHEH I'm prettier than what's inside you. I'm winking GEHEHEH",
      emote: "*He points at his eye socket*",
      dialogueLine: "SkelManVoice",
      choices: [{ text: "1) Continue...", next: 3 }],
    },
    {
      text: "GEH! Yeah it's wierd that you can see me. I'm Light-Bleached after all.",
      emote: "",
      dialogueLine: "SkelManVoice",
      choices: [
        { text: "1) What is Light-Bleached?", next: 4 },
        {
          text: "2) Can I get some of that bleach for my eyes?",
          next: 4,
        },
      ],
    },
    {
      text: "GEHEHEHEHEH ANYWAYS DO YOU LIKE PUZZLES? THERE IS ONE IN THIS VERY ROOM WOOWEEWOOWEE",
      emote: "",
      dialogueLine: "SkelManVoice",
      choices: [
        {
          text: "1) How about you tell me what Light-Bleached means instead?",
          next: 5,
        },
        {
          text: "2) I didn't ask for a puzzle...",
          next: 6,
        },
      ],
    },
    {
      text: "GEHEHEHEHEH ANYWAYS DO YOU LIKE PUZZLES? THERE IS ONE IN THIS VERY ROOM WOOWEEWOOWEE",
      emote: "",
      dialogueLine: "SkelManVoice",
      choices: [
        {
          text: "1) OK...",
          next: 6,
        },
      ],
    },
    {
      text: "GEHEHEHEHEH ANYWAYS DO YOU LIKE PUZZLES? THERE IS ONE IN THIS VERY ROOM WOOWEEWOOWEE - wadawingdabadoo-wadawingdabadoo-wadawingdabadoo-wadawingdabadoo-wadawingdabadoo-wadawingdabadoo-wadawingdabadoo-wadawingdabadoo-wadawingdabadoo-wadawingdabadoo-wadawingdabadoo-wadawingdabadoo-wadawingdabadoo-wadawingdabadoo-wadawingdabadoo-wadawingdabadoo-wadawingdabadoo-wadawingdabadoo-wadawingdabadoo-wadawingdabadoo-wadawingdabadoo-wadawingdabadoo-wadawingdabadoo-Oh yeah...",
      emote: "*He winks at you, somehow without eyelids*",
      dialogueLine: "SkelManVoice",
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
  public fromScene: string = "SkelMan";
  public speakerName: string = "Fedora Skeleton:";
  public voiceLoop: boolean = true;
  public manyOptionsNode: number = -1;

  constructor() {
    super({ key: "SkelMan" });
  }

  preload() {
    this.load.image("SkelManBg", "/assets/conversations/laugh-skel.png");
    this.load.audio("SkelManMusic", "/assets/music/dimension-2.mp3");
    this.load.audio("SkelManVoice", "/assets/sfx/skelVoice.mp3");
  }

  create() {
    conversationLogic(this, "#378444", "black", "SkelManBg", "SkelManMusic");
  }
}
