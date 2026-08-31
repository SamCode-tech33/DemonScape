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
}

export default class PlayerStatsManager implements PlayerStats {
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

  constructor(data: Partial<PlayerStats> = {}) {
    this.health = data.health ?? 50;
    this.maxHealth = data.maxHealth ?? 50;
    this.magic = data.magic ?? 20;
    this.maxMagic = data.maxMagic ?? 20;
    this.experience = data.experience ?? 0;
    this.experienceGoal = data.experienceGoal ?? 50;
    this.str = data.str ?? 0;
    this.int = data.int ?? 0;
    this.wis = data.wis ?? 0;
    this.sta = data.sta ?? 0;
    this.agi = data.agi ?? 0;
    this.hit = data.hit ?? 0;
    this.level = data.level ?? 1;
    this.atrPoints = data.atrPoints ?? 0;
  }

  static fromSave(savedStats: Partial<PlayerStats>): PlayerStatsManager {
    return new PlayerStatsManager(savedStats);
  }

  private getExperienceGoal(level: number): number {
    return Math.floor(50 * level ** 1.5);
  }

  addExperience(amount: number): void {
    this.experience += amount;
    this.checkLevelUp();
  }

  private checkLevelUp(): void {
    while (this.experience >= this.experienceGoal) {
      this.experience -= this.experienceGoal;
      this.level += 1;
      this.experienceGoal = this.getExperienceGoal(this.level);
      this.onLevelUp();
    }
  }

  private onLevelUp(): void {
    this.atrPoints += 3;
    this.health = this.maxHealth;
    this.magic = this.maxMagic;
  }

  toJSON(): PlayerStats {
    const {
      health,
      maxHealth,
      magic,
      maxMagic,
      experience,
      experienceGoal,
      str,
      int,
      wis,
      sta,
      agi,
      hit,
      level,
      atrPoints,
    } = this;
    return {
      health,
      maxHealth,
      magic,
      maxMagic,
      experience,
      experienceGoal,
      str,
      int,
      wis,
      sta,
      agi,
      hit,
      level,
      atrPoints,
    };
  }
}
