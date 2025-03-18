import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Character } from "./Character";
import { Npc } from "./Npc";
import { Bbeg } from "./Bbeg";
import { Monster } from "./Monster";


@Entity()
export class Skill {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  description: string | null;

  @Column({ length: 50 })
  name: string;

  @ManyToMany(() => Bbeg, (bbeg) => bbeg.skills)
  @JoinTable({
    name: "skill_bbeg", joinColumn: {
      name: "skill_id",
      referencedColumnName: "id"
    },
    inverseJoinColumn: {
      name: "bbeg_id",
      referencedColumnName: "id"
    }
  })
  bbegs: Bbeg[];

  @ManyToMany(() => Character, (character) => character.skills)
  @JoinTable({
    name: "skill_character", joinColumn: {
      name: "skill_id",
      referencedColumnName: "id"
    },
    inverseJoinColumn: {
      name: "character_id",
      referencedColumnName: "id"
    }
  })
  characters: Character[];

  @ManyToMany(() => Monster, (monster) => monster.skills)
  @JoinTable({
    name: "skill_monster", joinColumn: {
      name: "skill_id",
      referencedColumnName: "id"
    },
    inverseJoinColumn: {
      name: "monster_id",
      referencedColumnName: "id"
    }
  })
  monsters: Monster[];

  @ManyToMany(() => Npc, (npc) => npc.skills)
  @JoinTable({
    name: "skill_npc", joinColumn: {
      name: "skill_id",
      referencedColumnName: "id"
    },
    inverseJoinColumn: {
      name: "npc_id",
      referencedColumnName: "id"
    }
  })
  npcs: Npc[];

}
