import {
    Column,
    Entity,
    Index,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Town } from './Town';
import { Inventory } from './Inventory';

@Entity()
export class Shop {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    @Index()
    name: string;

    @Column({ length: 50 })
    @Index()
    type: string;

    @OneToOne(() => Inventory)
    @JoinColumn({
        name: 'inventory_id',
    })
    inventory: Inventory | null;

    @ManyToOne(() => Town, (towns) => towns.shops)
    @JoinColumn({ name: 'town_id' })
    town: Town | null;
}
