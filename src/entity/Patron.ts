import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Character } from "./Character";
import { Alignment } from "./Alignment";

@Entity()
export class Patron {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  description: string | null;

  @Column({ nullable: true, length: 255 })
  goals: string | null;

  @Column({ nullable: true, length: 50 })
  home_plane: string | null;

  @Column({ length: 100 })
  name: string;

  @Column({ nullable: true })
  power_level: number | null;

  @Column({ nullable: true, length: 255 })
  rewards: string | null;

  @Column({ nullable: true, length: 50 })
  type: string | null;
  @Column({ nullable: true })
	damage_resistances: string;

	@Column({ nullable: true })
	damage_immunities: string;

	@Column({ nullable: true })
	condition_immunities: string;

	@Column({ nullable: true })
	armor_desc: string;

  @Column({type:"bytea",nullable:true})
  photo:Buffer

  @ManyToOne(() => Alignment, (alignment) => alignment.patrons)
  @JoinColumn({ name: 'alignment' })
  alignment: Alignment;

  @ManyToMany(() => Character, (characters) => characters.patrons)
  @JoinTable({
    name: "character_patron", joinColumn: {
      name: "patron_id",
      referencedColumnName: "id"
    },
    inverseJoinColumn: {
      name: "character_id",
      referencedColumnName: "id"
    }
  })
  characters: Character[];

}
