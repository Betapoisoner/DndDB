import { Column, Entity, Index, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Bbeg } from './Bbeg';
import { Npc } from './Npc';
import { Monster } from './Monster';

@Entity()
export class Action {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    @Index()
    action_name: string;

    @Column({ nullable: true })
    damage: number | null;

    @Column({ nullable: true })
    description: string | null;

    @Column({
        default: () => 'false',
    })
    is_legendary_action: boolean | null;

    @ManyToMany(() => Npc, (npc) => npc.actions)
    @JoinTable({
        name: 'npc_action',
        joinColumn: {
            name: 'action_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'npc_id',
            referencedColumnName: 'id',
        },
    })
    npcs: Npc[];

    @ManyToMany(() => Bbeg, (Bbeg) => Bbeg.lair_actions)
    @JoinTable({
        name: 'bbeg_lair_action',
        joinColumn: {
            name: 'action_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'bbeg_id',
            referencedColumnName: 'id',
        },
    })
    Bbeg_lairs: Bbeg[];

    @ManyToMany(() => Bbeg, (Bbeg) => Bbeg.actions)
    @JoinTable({
        name: 'bbeg_action',
        joinColumn: {
            name: 'action_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'bbeg_id',
            referencedColumnName: 'id',
        },
    })
    bbegs: Bbeg[];

    @ManyToMany(() => Monster, (monsters) => monsters.actions)
    @JoinTable({
        name: 'monster_action',
        joinColumn: {
            name: 'action_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'monster_id',
            referencedColumnName: 'id',
        },
    })
    monsters: Monster[];
}
