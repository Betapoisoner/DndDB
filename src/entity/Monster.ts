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
import { Alignment } from "./Alignment";
import { Fauna } from "./Fauna";
import { Action } from "./Action";
import { Spell } from "./Spell";
import { Skill } from "./Skill";
import { Inventory } from "./Inventory";

@Entity()
export class Monster {
  @Column()
  armor_class: number;

  @Column({ nullable: true, length: 255 })
  challenge: string | null;

  @Column()
  challenge_rating: number;

  @Column()
  charisma: number;

  @Column()
  constitution: number;

  @Column()
  dexterity: number;

  @Column()
  experience_points: number;

  @Column()
  hit_points: number;

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  intelligence: number;

  @Column({ nullable: true, length: 255 })
  languages: string | null;

  @Column({ length: 100 })
  name: string;

  @Column({ nullable: true, length: 255 })
  senses: string | null;

  @Column({ length: 20 })
  size: string;

  @Column({ length: 50 })
  speed: string;

  @Column()
  strength: number;

  @Column({ length: 50 })
  type: string;

  @Column()
  wisdom: number;

  @Column({ nullable: true })
	damage_resistances: string;

	@Column({ nullable: true })
	damage_immunities: string;

	@Column({ nullable: true })
	condition_immunities: string;

	@Column({ nullable: true })
	armor_desc: string;

  @Column({type:"bytea", nullable:true})
  photo:Buffer

  @ManyToMany(() => Action, (actions) => actions.monsters, { nullable: true })
  actions: Action[];

  @ManyToOne(() => Alignment, (alignment) => alignment.monsters)
  @JoinColumn({ name: 'alignment' })
  alignment: Alignment;

  @ManyToMany(() => Fauna, (fauna) => fauna.monsters)
  faunas: Fauna[];

  @ManyToMany(() => Skill, (skills) => skills.monsters)
  skills: Skill[];

  @ManyToMany(() => Spell, (spells) => spells.monsters)
  @JoinTable({
    name: "monster_spell", joinColumn: {
      name: "monster_id",
      referencedColumnName: "id"
    },
    inverseJoinColumn: {
      name: "spell_id",
      referencedColumnName: "id"
    }
  })
  spells: Spell[];

  @OneToOne(() => Inventory)
  @JoinColumn({
	  name:"inventory_id",
	})
      inventory: Inventory | null;
  
}
