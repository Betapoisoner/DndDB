import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Dungeon } from "./Dungeon";
import { World } from "./World";
import { Town } from "./Town";
import { Fauna } from "./Fauna";

@Entity()
export class Region {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  climate: string;

  @Column({ nullable: true })
  description: string | null;

  @Column({ nullable: true, length: 255 })
  landmarks: string | null;

  @Column({ length: 100 })
  name: string;

  @Column({ nullable: true, length: 255 })
  resources: string | null;

  @Column({ length: 255 })
  terrain: string;

  @Column({type:"bytea",nullable:true})
  map:Buffer

  @ManyToMany(() => Dungeon, (dungeons) => dungeons.regions)
  @JoinTable({
    name: "dungeon_region", joinColumn: {
      name: "region_id",
      referencedColumnName: "id"
    },
    inverseJoinColumn: {
      name: "dungeon_id",
      referencedColumnName: "id"
    }
  })
  dungeons: Dungeon[];

  @OneToMany(() => Fauna, (fauna) => fauna.region)
  faunas: Fauna[];

  @OneToMany(() => Town, (towns) => towns.region)
  towns: Town[];

  @ManyToMany(() => World, (world) => world.regions)
  @JoinTable({
    name: "world_region", joinColumn: {
      name: "region_id",
      referencedColumnName: "id"
    },
    inverseJoinColumn: {
      name: "world_id",
      referencedColumnName: "id"
    }
  })
  worlds: World[];

}
