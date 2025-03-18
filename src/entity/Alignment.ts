import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Monster } from "./Monster";
import { Character } from "./Character";
import { Bbeg } from "./Bbeg";
import { Npc } from "./Npc";
import { ImportantFigure } from "./ImportantFigure";
import { Patron } from "./Patron";

@Entity()
export class Alignment {
  @PrimaryColumn()
  alignment: string

  @Column({ nullable: true })
  description: string | null;

  @OneToMany(() => Npc, (npcs) => npcs.alignment)
  npcs: Npc[];

  @OneToMany(() => Bbeg, (bbegs) => bbegs.alignment)
  bbegs: Bbeg[];

  @OneToMany(() => Character, (characters) => characters.alignment)
  characters: Character[];

  @OneToMany(
    () => ImportantFigure,
    (importantFigures) => importantFigures.alignment
  )
  important_figures: ImportantFigure[];

  @OneToMany(() => Monster, (monsters) => monsters.alignment)
  monsters: Monster[];

  @OneToMany(() => Patron, (patrons) => patrons.alignment)
  patrons: Patron[];
}
