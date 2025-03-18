import {
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Item } from "./Item";

@Entity()
export class Inventory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => Item, (item) => item.iventories,)
  @JoinTable({
    name: "item_inventory", joinColumn: {
      name: "inventory_id",
      referencedColumnName: "id"
    },
    inverseJoinColumn: {
      name: "item_id",
      referencedColumnName: "id"
    }
  })
  items: Item[];
}
