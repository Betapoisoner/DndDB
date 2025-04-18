import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    Tree,
    TreeChildren,
    TreeParent,
} from 'typeorm';
import { Npc } from './Npc';
import { Shop } from './Shop';
import { Region } from './Region';
import { ImportantFigure } from './ImportantFigure';

@Entity()
@Tree('materialized-path')
export class Town {
    @PrimaryGeneratedColumn()
    id: number;

    @TreeParent({ onDelete: 'SET NULL' })
    capital: Town | null;

    @TreeChildren({ cascade: true })
    satelliteTowns: Town[];

    
    @Column({
        nullable: true,
        default: () => 'false',
    })
    is_capital: boolean | null;

    @Column({ nullable: true, length: 255 })
    landmarks: string | null;

    @Column({ length: 100 })
    @Index()
    name: string;

    @Column()
    population: number;

    @Column()
    prosperity: number;

    @Column({ type: 'bytea' })
    map: Buffer;

    @OneToMany(() => ImportantFigure, (importantFigures) => importantFigures.town)
    important_figures: ImportantFigure[];

    @OneToMany(() => Npc, (npcs) => npcs.town)
    npcs: Npc[];

    @ManyToOne(() => Region, (regions) => regions.towns)
    @JoinColumn({ name: 'region_id' })
    @Index()
    region: Region;

    @OneToMany(() => Shop, (shops) => shops.town)
    shops: Shop[];
}
