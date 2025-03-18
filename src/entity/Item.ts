import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Reward } from "./Reward";
import { Inventory } from "./Inventory";
import { Shop } from "./Shop";

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  description: string | null;

  @Column({ length: 50 })
  name: string;

  @Column({ default: () => "'1'" })
  quantity: number;

  @Column({ length: 20 })
  rarity: string;

  @Column({ length: 20 })
  type: string;

  @Column()
  value: number;

  @Column()
  weight: number;

  @Column({type:"bytea", nullable:true})
  photo:Buffer

  @ManyToMany(() => Inventory, (inventory) => inventory.items)
  iventories: Inventory[];

  @OneToMany(() => Reward, (rewards) => rewards.item)
  rewards: Reward[];

}
