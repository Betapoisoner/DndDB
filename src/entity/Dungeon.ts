import { Column, Entity, Index, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Region } from './Region';
import { Fauna } from './Fauna';
import { Bbeg } from './Bbeg';

@Entity()
export class Dungeon {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({ nullable: true })
    description: string | null;

    @Column({
        default: () => 'false',
        nullable: true,
    })
    has_bbeg: boolean | null;

    @Column()
    level_count: number;

    @Column({ length: 255 })
    @Index()
    location: string;

    @Column({ length: 100 })
    @Index()
    name: string;

    @Column()
    treasure_count: number;

    @Column({ type: 'bytea' })
    map: Buffer;

    @ManyToOne(() => Bbeg, (bbegs) => bbegs.dungeons)
    @JoinColumn({ name: 'bbeg_id' })
    bbeg: Bbeg;

    @OneToMany(() => Fauna, (fauna) => fauna.dungeon)
    faunas: Fauna[];

    @ManyToMany(() => Region, (regions) => regions.dungeons)
    regions: Region[];
}
