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
import { Item } from "./Item";
import { Inventory } from "./Inventory";

@Entity()
export class Shop {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 50 })
  type: string;


  @OneToOne(() => Inventory)
  @JoinColumn({
    name: "inventory_id",
  })

  inventory: Inventory | null;

  @ManyToOne(() => Town, (towns) => towns.shops,)
  @JoinColumn({ name: 'town_id' })
  town: Town |null;

}
