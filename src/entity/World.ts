import {
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Campaign } from "./Campaign";
import { Region } from "./Region";

@Entity()
export class World {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  calendar: string | null;

  @Column({ nullable: true })
  climate: string | null;

  @Column({ nullable: true })
  description: string | null;

  @Column({ nullable: true })
  geography: string | null;

  @Column({ nullable: true })
  history: string | null;

  @Column({ nullable: true })
  magic_system: string | null;

  @Column({type:"bytea"})
  map:Buffer

  @Column({ length: 100 })
  name: string;

  @ManyToMany(() => Campaign, (campaigns) => campaigns.worlds)
  campaigns: Campaign[];

  @ManyToMany(() => Region, (regions) => regions.worlds)
  regions: Region[];
}
