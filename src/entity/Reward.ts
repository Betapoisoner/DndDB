import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Item } from './Item';

@Entity()
export class Reward {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    description: string | null;

    @Column({
        nullable: true,
        default: () => 'false',
    })
    is_item: boolean | null;

    @Column({ length: 100 })
    name: string;

    @Column({ default: () => "'1'" })
    quantity: number;

    @Column({ length: 20 })
    rarity: string;

    @Column({ length: 50 })
    type: string;

    @Column()
    value: number;

    @ManyToOne(() => Item, (items) => items.rewards, {})
    @JoinColumn([{ name: 'item_id', referencedColumnName: 'id' }])
    item: Item;
}
