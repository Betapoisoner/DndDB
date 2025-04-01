import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Event } from './Event';
import { Campaign } from './Campaign';

@Entity()
export class Session {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        nullable: true,
    })
    @Index()
    end_tme: Date;

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        nullable: true,
    })
    @Index()
    start_time: Date;

    @Column({ nullable: true })
    summary: string | null;

    @Column({ nullable: true })
    treasure_aquired: string | null;

    @Column({ nullable: true })
    xp_awarded: number | null;

    @ManyToOne(() => Campaign, (campaign) => campaign.sessions)
    @JoinColumn({ name: 'campaign_id' })
    campaign: Campaign;

    @OneToMany(() => Event, (events) => events.session)
    events: Event[];
}
