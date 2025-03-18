import {
    Column,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Skill } from './Skill';
import { Alignment } from './Alignment';
import { Patron } from './Patron';
import { Campaign } from './Campaign';
import { Spell } from './Spell';
import { Inventory } from './Inventory';

@Entity()
export class Character {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: () => "'10'" })
    armor_class: number;

    @Column({ length: 20 })
    background: string;

    @Column({ default: () => "'10'" })
    charisma: number;

    @Column({ length: 20 })
    class: string;

    @Column({ default: () => "'10'" })
    constitution: number;

    @Column({ default: () => "'10'" })
    dexterity: number;

    @Column({ nullable: true, length: 255 })
    equipment: string | null;

    @Column({ default: () => "'0'" })
    experience: number;

    @Column({ default: () => "'0'" })
    gold: number;

    @Column({ default: () => "'10'" })
    hit_points: number;

    @Column({ default: () => "'0'" })
    initiative: number;

    @Column({ default: () => "'10'" })
    intelligence: number;

    @Column({ default: () => "'1'" })
    level: number;

    @Column({ length: 50, unique: true })
    name: string;

    @Column({ nullable: true })
    notes: string | null;

    @Column({ default: () => "'2'" })
    proficiency_bonus: number;

    @Column({ length: 20 })
    race: string;

    @Column({ type: 'bytea', nullable: true })
    photo: Buffer;

    @Column({ default: () => "'30'" })
    speed: number;

    @Column({ default: () => "'10'" })
    strength: number;

    @Column({ default: () => "'10'" })
    wisdom: number;

    @Column({ nullable: true })
    damage_resistances: string;

    @Column({ nullable: true })
    damage_immunities: string;

    @Column({ nullable: true })
    condition_immunities: string;

    @Column({ nullable: true })
    armor_desc: string;

    @ManyToOne(() => Alignment, (alignment) => alignment.characters)
    @JoinColumn({ name: 'alignment' })
    alignment: Alignment;

    @ManyToMany(() => Campaign, (campaigns) => campaigns.characters)
    campaigns: Campaign[];

    @ManyToMany(() => Patron, (patrons) => patrons.characters)
    patrons: Patron[];

    @ManyToMany(() => Skill, (skill) => skill.characters)
    skills: Skill[];

    @ManyToMany(() => Spell, (spells) => spells.characters)
    @JoinTable({
        name: 'character_spell',
        joinColumn: {
            name: 'character_id',
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
