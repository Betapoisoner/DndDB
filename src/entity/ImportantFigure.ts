import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Alignment } from "./Alignment";
import { Town } from "./Town";


@Entity()
export class ImportantFigure {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  description: string | null;

  @Column({ length: 100 })
  name: string;

  @Column({ nullable: true, length: 50 })
  title: string | null;

  @Column({type:"bytea", nullable:true})
  photo:Buffer

  @ManyToOne(() => Alignment, (alignment) => alignment.important_figures)
  @JoinColumn({ name: 'alignment' })
  alignment: Alignment;

  @ManyToOne(() => Town, (towns) => towns.important_figures)
  @JoinColumn({ name: 'town_id' })
  town: Town;
}
