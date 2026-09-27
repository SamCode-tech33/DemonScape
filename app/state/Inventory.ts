import type PlayerStatsManager from "./PlayerStats";

// ---- Equipment ----

type EquipmentSlot = "melee" | "ranged" | "armor" | "magick";

interface EquipmentItem {
  name: string;
  slot: EquipmentSlot;
  damage?: number; // melee / ranged / magick
  defense?: number; // armor
  look: Phaser.GameObjects.Sprite;
}

// ---- Quest Items ----
// Just unique string identifiers, e.g. "rustyKey", "elderNote"
type QuestItem = string;

// ---- Consumables ----
// Each consumable is an object with a name and an effect function
// that mutates the player's stats when used.

interface ConsumableItem {
  name: string;
  effect: (playerStats: PlayerStatsManager) => void;
}

// ---- Registry ----

export default class InventoryRegistry {
  equipment: EquipmentItem[];
  questItems: QuestItem[];
  consumables: ConsumableItem[];

  constructor(
    equipment: EquipmentItem[] = [],
    questItems: QuestItem[] = [],
    consumables: ConsumableItem[] = [],
  ) {
    this.equipment = equipment;
    this.questItems = questItems;
    this.consumables = consumables;
  }

  // ---- Equipment ----

  addEquipment(item: EquipmentItem): void {
    this.equipment.push(item);
  }

  removeEquipment(name: string): void {
    this.equipment = this.equipment.filter((item) => item.name !== name);
  }

  getEquipmentBySlot(slot: EquipmentSlot): EquipmentItem[] {
    return this.equipment.filter((item) => item.slot === slot);
  }

  // ---- Quest Items ----

  addQuestItem(id: QuestItem): void {
    if (!this.questItems.includes(id)) {
      this.questItems.push(id);
    }
  }

  hasQuestItem(id: QuestItem): boolean {
    return this.questItems.includes(id);
  }

  removeQuestItem(id: QuestItem): void {
    this.questItems = this.questItems.filter((item) => item !== id);
  }

  // ---- Consumables ----

  addConsumable(item: ConsumableItem): void {
    this.consumables.push(item);
  }

  useConsumable(name: string, playerStats: PlayerStatsManager): void {
    const index = this.consumables.findIndex((item) => item.name === name);
    if (index === -1) return;

    const item = this.consumables[index];
    item.effect(playerStats);
    this.consumables.splice(index, 1); // remove after use
  }
}
