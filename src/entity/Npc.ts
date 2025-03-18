import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Town } from "./Town";
import { Skill } from "./Skill";
import { Action } from "./Action";
import { Spell } from "./Spell";
import { Inventory } from "./Inventory";
import { Alignment } from "./Alignment";


@Entity()
export class Npc {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @Column({ default: () => "'10'" })
  armor_class: number;

  @Column({ nullable: true, length: 200 })
  background: string | null;

  @Column({ default: () => "'10'" })
  charisma: number;

  @Column({ nullable: true, length: 20 })
  class: string | null;

  @Column({ default: () => "'10'" })
  constitution: number;

  @Column({ default: () => "'10'" })
  dexterity: number;

  @Column({ nullable: true, length: 255 })
  equipment: string | null;

  @Column({ default: () => "'0'" })
  gold: number;

  @Column({ default: () => "'10'" })
  hit_points: number;

  @Column({ default: () => "'0'" })
  initiative: number;

  @Column({ default: () => "'10'" })
  intelligence: number;

  @Column({ default: () => "'1'" })
  level: number;

  @Column({ nullable: true })
  notes: string | null;

  @Column({ default: () => "'2'" })
  proficiency_bonus: number;

  @Column({ length: 20 })
  race: string;

  @Column({ default: () => "'30'" })
  speed: number;

  @Column({ default: () => "'10'" })
  strength: number;

  @Column({ default: () => "'10'" })
  wisdom: number;
  
  @Column({ nullable: true })
	damage_resistances: string;

	@Column({ nullable: true })
	damage_immunities: string;

	@Column({ nullable: true })
	condition_immunities: string;

	@Column({ nullable: true })
	armor_desc: string;

  @ManyToMany(() => Action, (actions) => actions.npcs)
  actions: Action[];

  @Column({type:"bytea", nullable:true})
  photo:Buffer

  @ManyToOne(() => Alignment, (alignment) => alignment.npcs)
    @JoinColumn({ name: 'alignment' })
    alignment: Alignment;

  @ManyToMany(() => Skill, (skill) => skill.npcs)
  skills: Skill[];

  @ManyToMany(() => Spell, (spells) => spells.npcs)
  @JoinTable({
    name: "npc_spell", joinColumn: {
      name: "npc_id",
      referencedColumnName: "id"
    },
    inverseJoinColumn: {
      name: "spell_id",
      referencedColumnName: "id"
    }
  })
  spells: Spell[];

  @ManyToOne(() => Town, (towns) => towns.npcs)
  @JoinColumn({ name: 'npc_town' })
  town: Town;

  @OneToOne(() => Inventory )
  @JoinColumn({
	  name:"inventory_id",
	})
      inventory: Inventory | null;
}
