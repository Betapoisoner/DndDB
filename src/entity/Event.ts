import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Session } from './Session';

@Entity()
export class Event {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        nullable: true,
    })
    @Index()
    date: Date | null;

    @Column({ nullable: true })
    description: string | null;

    @Column({ length: 50 })
    @Index()
    event_type: string;

    @ManyToOne(() => Session, (sessions) => sessions.events)
    @JoinColumn({ name: 'session_id' })
    session: Session;
}
