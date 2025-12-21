import type {
  ConvoSceneState,
  DialogueNode,
} from "@/app/components/demonScapeTypes";
import { conversationLogic } from "@/app/components/conversationLogic";

export default class CultHead extends Phaser.Scene implements ConvoSceneState {
  public dialogue1Nodes: DialogueNode[] = [
    {
      text: "You whine like fettered swine. Why?",
      emote: "",
      dialogueLine: "cultHead-line-0",
      choices: [
        {
          text: "1) Th-this heart in my hand. . . wh-where am I? I-I was just in my room...",
          next: 1,
        },
        {
          text: "2) Who the hell are you?! I'll scream if I want to scream.",
          next: 2,
        },
      ],
    },
    {
      text: "Hmm your eyes show no light, and so the bind is tight. But what pathetic words for a demon of your stature... Hell burns at the same rate as your evaporating masculinity.",
      emote: "*He leans in and peers intently into your eyes*",
      dialogueLine: "cultHead-line-1",
      choices: [{ text: "1) Continue...", next: 3 }],
    },
    {
      text: "*He leans in and peers intently into your eyes* Hmm your eyes show no light, and so the bind is tight. But for a demon of your stature to so brazenly speak to a Lord two-hundred years your superior... You must be having trouble grasping reality.",
      emote: "*He leans in and peers intently into your eyes*",
      dialogueLine: "cultHead-line-2",
      choices: [{ text: "1) Continue...", next: 3 }],
    },
    {
      text: "Heal your mind or we will tear your soul for energy. Have the twins check you out. They're in the room to the right of here. We will finish without you...",
      emote: "*His fist lights aflame and he punches you swiftly in the gut*",
      dialogueLine: "cultHead-line-3",
      // no choices = end
    },
  ];
  public dialogue2Nodes: DialogueNode[] = [
    {
      text: "The potion proves the bind upon this mind is in motion. However, your negligence leaves you on the fence.",
      emote: "",
      dialogueLine: "cultHead-line-4",
      choices: [
        {
          text: "1) You're rhyming more consistently this time.",
          next: 1,
        },
        {
          text: "2) They said you would have killed me if I had less demonic energy.",
          next: 2,
        },
      ],
    },
    {
      text: "I lament your useless comment",
      emote: "",
      dialogueLine: "cultHead-line-5",
      choices: [
        {
          text: "1) They said you would have killed me if I had less demonic energy...",
          next: 2,
        },
      ],
    },
    {
      text: "Yes, and after you restore your connection to this brain. From thence, you best have good sense.",
      emote: "",
      dialogueLine: "cultHead-line-6",
      choices: [
        { text: "1) Continue...", next: 3 },
        {
          text: "2) Ooh I thought you were about to miss a rhyme that time.",
          next: 3,
        },
      ],
    },
    {
      text: "I will enjoy the melting of your brain if you fail.",
      emote: "",
      dialogueLine: "cultHead-line-7",
      // no choices = end
    },
  ];
  public dialogue3Nodes: DialogueNode[] = [
    {
      text: "I will enjoy the melting of your brain if you fail.",
      emote: "",
      dialogueLine: "cultHead-line-8",
    },
  ];
  public dialogue4Nodes: DialogueNode[] = [
    {
      text: "Ah, the zombie groans have fell to silence after your swift violence. So have you regained your wits?",
      emote: "*He peers deeply into your eyes*",
      dialogueLine: "cultHead-line-9",
      choices: [
        {
          text: "1) No! I am telling you I am a Human!",
          next: 1,
        },
        {
          text: "2) (Lie) Yes, of course. I am in complete control now.",
          next: 2,
        },
      ],
    },
    {
      text: "A pity...",
      emote: "",
      dialogueLine: "cultHead-line-10",
    },
    {
      text: "Then leave. We have much to prepare for this eve.",
      emote: "",
      dialogueLine: "cultHead-line-11",
    },
  ];

  public dialogueNodes: DialogueNode[] = [];
  public currentNodeIndex: number = 0;
  public dialogueText!: Phaser.GameObjects.Text;
  public choiceTexts: Phaser.GameObjects.Text[] = [];
  public music!: Phaser.Sound.BaseSound;
  public voiceDialogue: Phaser.Sound.BaseSound | null = null;
  public speechInterval: NodeJS.Timeout | null = null;
  public speakerText!: Phaser.GameObjects.Text;
  public playerSpeaker!: Phaser.GameObjects.Text;
  public dialogueScene: number = 1;
  public emoteText!: Phaser.GameObjects.Text;
  public emoteBg!: Phaser.GameObjects.Rectangle;
  public fromScene: string = "CultHead";
  public speakerName: string = "Cult Head:";
  public voiceLoop: boolean = false;
  public manyOptionsNode: number = -1;

  constructor() {
    super({ key: "CultHead" });
  }

  init(data: { cultHeadSceneNum: number }) {
    console.log(data.cultHeadSceneNum);
    switch (data.cultHeadSceneNum) {
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
      case 4:
        this.dialogueNodes = this.dialogue4Nodes;
        this.dialogueScene = 4;
        break;
    }
  }

  preload() {
    this.load.image("cultHeadBg", "/assets/conversations/cultHead.png");
    this.load.audio("cultHeadMusic", "/assets/music/morbid.mp3");
    this.load.audio(
      "cultHead-line-0",
      "/assets/dialogue/cultHead/cultHead-dialogue0.wav"
    );
    this.load.audio(
      "cultHead-line-1",
      "/assets/dialogue/cultHead/cultHead-dialogue1.wav"
    );
    this.load.audio(
      "cultHead-line-2",
      "/assets/dialogue/cultHead/cultHead-dialogue2.wav"
    );
    this.load.audio(
      "cultHead-line-3",
      "/assets/dialogue/cultHead/cultHead-dialogue3.wav"
    );
    this.load.audio(
      "cultHead-line-4",
      "/assets/dialogue/cultHead/cultHead-dialogue4.wav"
    );
    this.load.audio(
      "cultHead-line-5",
      "/assets/dialogue/cultHead/cultHead-dialogue5.wav"
    );
    this.load.audio(
      "cultHead-line-6",
      "/assets/dialogue/cultHead/cultHead-dialogue6.wav"
    );
    this.load.audio(
      "cultHead-line-7",
      "/assets/dialogue/cultHead/cultHead-dialogue7.wav"
    );
    this.load.audio(
      "cultHead-line-8",
      "/assets/dialogue/cultHead/cultHead-dialogue7.wav"
    );
    this.load.audio(
      "cultHead-line-9",
      "/assets/dialogue/cultHead/cultHead-dialogue8.wav"
    );
    this.load.audio(
      "cultHead-line-10",
      "/assets/dialogue/cultHead/cultHead-dialogue9.wav"
    );
    this.load.audio(
      "cultHead-line-11",
      "/assets/dialogue/cultHead/cultHead-dialogue10.wav"
    );
  }

  create() {
    // Background portrait
    conversationLogic(this, "red", "black", "cultHeadBg", "cultHeadMusic");
  }
}
