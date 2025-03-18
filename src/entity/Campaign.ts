import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { World } from './World';
import { Session } from './Session';
import { Character } from './Character';

@Entity()
export class Campaign {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: true })
    current_date: Date | null;

    @Column({ nullable: true, length: 255 })
    current_location: string | null;

    @Column({ nullable: true })
    description: string | null;

    @Column({ length: 100 })
    name: string;

    @Column({ length: 20 })
    status: string;

    @Column({ type: 'bytea', nullable: true })
    photo: Buffer;

    @ManyToMany(() => Character, (characters) => characters.campaigns)
    @JoinTable({
        name: 'campaign_character',
        joinColumn: {
            name: 'campaign_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'character_id',
            referencedColumnName: 'id',
        },
    })
    characters: Character[];

    @OneToMany(() => Session, (sessions) => sessions.campaign)
    sessions: Session[];

    @ManyToMany(() => World, (world) => world.campaigns)
    @JoinTable({
        name: 'campaign_world',
        joinColumn: {
            name: 'campaign_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'world_id',
            referencedColumnName: 'id',
        },
    })
    worlds: World[];
}
