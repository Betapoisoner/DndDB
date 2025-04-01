import {
    Column,
    Entity,
    Index,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Alignment } from './Alignment';
import { Action } from './Action';
import { Dungeon } from './Dungeon';
import { Skill } from './Skill';
import { Spell } from './Spell';
import { Inventory } from './Inventory';

@Entity()
export class Bbeg {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    armor_class: number;

    @Column({ nullable: true, length: 255 })
    challenge: string | null;

    @Column()
    @Index()
    challenge_rating: number;

    @Column()
    charisma: number;

    @Column()
    constitution: number;

    @Column()
    dexterity: number;

    @Column()
    experience_points: number;

    @Column()
    hit_points: number;

    @Column()
    intelligence: number;

    @Column({ nullable: true })
    lair_bonus: string | null;

    @Column({ nullable: true, length: 255 })
    languages: string | null;

    @Column({ length: 100, unique: true })
    name: string;

    @Column({ nullable: true, length: 255 })
    senses: string | null;

    @Column({ length: 20 })
    size: string;

    @Column({ length: 50 })
    speed: string;

    @Column()
    strength: number;

    @Column({ length: 50 })
    @Index()
    type: string;

    @Column()
    wisdom: number;

    @Column({ nullable: true })
    damage_resistances: string;

    @Column({ nullable: true })
    damage_immunities: string;

    @Column({ nullable: true })
    condition_immunities: string;

    @Column({ nullable: true })
    armor_desc: string;

    @Column({ type: 'bytea', nullable: true })
    photo: Buffer;

    @ManyToMany(() => Action, (actions) => actions.bbegs, { cascade: true })
    actions: Action[];

    @ManyToOne(() => Alignment, (alignment) => alignment.bbegs, { cascade: true })
    @JoinColumn({ name: 'alignment' })
    @Index()
    alignment: Alignment;

    @OneToMany(() => Dungeon, (dungeons) => dungeons.bbeg)
    dungeons: Dungeon[];

    @ManyToMany(() => Action, (actions) => actions.Bbeg_lairs, { cascade: true })
    lair_actions: Action[];

    @ManyToMany(() => Skill, (skills) => skills.bbegs)
    skills: Skill[];

    @ManyToMany(() => Spell, (spells) => spells.bbegs, { cascade: true })
    @JoinTable({
        name: 'bbeg_spell',
        joinColumn: {
            name: 'bbeg_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'spell_id',
            referencedColumnName: 'id',
        },
    })
    spells: Spell[];

    @OneToOne(() => Inventory)
    @JoinColumn({
        name: 'inventory_id',
    })
    inventory: Inventory | null;
}
