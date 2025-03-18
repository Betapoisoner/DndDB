import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Dungeon } from './Dungeon';
import { Region } from './Region';
import { Monster } from './Monster';

@Entity()
export class Fauna {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    level: number;
    @Column({ length: 100 })
    name: string;

    @Column()
    quantity: number;
    @Column({ length: 50 })
    type: string;
    @ManyToOne(() => Dungeon, (dungeons) => dungeons.faunas)
    @JoinColumn({ name: 'dungeon_id' })
    dungeon: Dungeon;
    @ManyToMany(() => Monster, (monsters) => monsters.faunas)
    @JoinTable({
        name: 'fauna_monster',
        joinColumn: {
            name: 'fauna_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'monster_id',
            referencedColumnName: 'id',
        },
    })
    monsters: Monster[];
    @ManyToOne(() => Region, (regions) => regions.faunas)
    @JoinColumn({ name: 'region_id' })
    region: Region;
}
