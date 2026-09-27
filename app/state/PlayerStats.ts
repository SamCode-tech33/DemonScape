interface EquippedItem {
  damageMultiplier?: number;
  defense?: number;
  look?: Phaser.GameObjects.Sprite;
}

interface Equipment {
  melee: EquippedItem;
  ranged: EquippedItem;
  magick: EquippedItem;
  armor: EquippedItem;
}

interface PlayerStats {
  health: number;
  maxHealth: number;
  magic: number;
  maxMagic: number;
  experience: number;
  experienceGoal: number;
  str: number;
  int: number;
  wis: number;
  sta: number;
  agi: number;
  hit: number;
  level: number;
  atrPoints: number;
  money: number;
  suspicion: number;
  prevSus: number;
  equipment: Equipment;

  //derived elements
  meleeDamage: number;
  magickDamage: number;
  rangedDamage: number;
  armorDefense: number;
  reactWindow: number;
  speed: number;
}

const defaultEquipment = {
  melee: {},
  ranged: {},
  magick: {},
  armor: {},
};

export default class PlayerStatsManager implements PlayerStats {
  health: number;
  magic: number;
  experience: number;
  str: number;
  int: number;
  wis: number;
  sta: number;
  agi: number;
  hit: number;
  level: number;
  atrPoints: number;
  money: number;
  suspicion: number;
  prevSus: number;
  equipment: Equipment;

  constructor(data: Partial<PlayerStats> = {}) {
    this.str = data.str ?? 1;
    this.int = data.int ?? 1;
    this.wis = data.wis ?? 1;
    this.sta = data.sta ?? 1;
    this.agi = data.agi ?? 1;
    this.hit = data.hit ?? 1;
    this.level = data.level ?? 1;
    this.health = data.health ?? this.maxHealth;
    this.magic = data.magic ?? this.maxMagic;
    this.experience = data.experience ?? 0;
    this.atrPoints = data.atrPoints ?? 0;
    this.money = data.money ?? 0;
    this.suspicion = data.suspicion ?? 0;
    this.prevSus = data.prevSus ?? 0;
    this.equipment = data.equipment ?? defaultEquipment;
  }

  get maxHealth() {
    return 45 + this.sta * 5;
  }

  get maxMagic() {
    return 20 + this.wis * 5;
  }

  get experienceGoal() {
    return Math.round(50 * this.level ** 1.5);
  }

  get meleeDamage(): number {
    const base = this.equipment.melee.damageMultiplier ?? 0;
    return Math.floor(base + this.str * 2);
  }

  get rangedDamage(): number {
    const base = this.equipment.ranged.damageMultiplier ?? 0;
    return Math.floor(base + this.str * 2);
  }

  get magickDamage(): number {
    const base = this.equipment.magick.damageMultiplier ?? 0;
    return base + this.int * 2 + Math.floor(this.wis / 2);
  }

  get armorDefense(): number {
    return this.equipment.armor.defense ?? 0;
  }

  get reactWindow() {
    return 0.1 + this.hit * 0.02;
  }

  get speed() {
    return this.agi * 100;
  } // anim speed in ms

  static fromSave(savedStats: Partial<PlayerStats>): PlayerStatsManager {
    return new PlayerStatsManager(savedStats);
  }

  addExperience(amount: number): void {
    this.experience += amount;
    this.checkLevelUp();
  }

  private checkLevelUp(): void {
    while (this.experience >= this.experienceGoal) {
      this.experience -= this.experienceGoal;
      this.level += 1;
      this.atrPoints += 3;
    }
  }

  toJSON(): PlayerStats {
    return {
      health: this.health,
      maxHealth: this.maxHealth,
      magic: this.magic,
      maxMagic: this.maxMagic,
      experience: this.experience,
      experienceGoal: this.experienceGoal,
      str: this.str,
      int: this.int,
      wis: this.wis,
      sta: this.sta,
      agi: this.agi,
      hit: this.hit,
      level: this.level,
      atrPoints: this.atrPoints,
      money: this.money,
      suspicion: this.suspicion,
      prevSus: this.prevSus,
      equipment: this.equipment,
      meleeDamage: this.meleeDamage,
      magickDamage: this.magickDamage,
      rangedDamage: this.rangedDamage,
      armorDefense: this.armorDefense,
      reactWindow: this.reactWindow,
      speed: this.speed,
    };
  }
}
