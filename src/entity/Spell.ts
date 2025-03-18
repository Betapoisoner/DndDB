import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Character } from './Character';
import { Monster } from './Monster';
import { Bbeg } from './Bbeg';
import { Npc } from './Npc';

@Entity()
export class Spell {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255 })
    casting_time: string;

    @Column()
    component: string;
    @Column()
    duration: string;

    @Column({ length: 255 })
    name: string;

    @Column()
    range: string;

    @Column({ length: 255 })
    school: string;

    @ManyToMany(() => Bbeg, (bbegs) => bbegs.spells)
    bbegs: Bbeg[];

    @ManyToMany(() => Character, (characters) => characters.spells)
    characters: Character[];

    @ManyToMany(() => Monster, (monsters) => monsters.spells)
    monsters: Monster[];

    @ManyToMany(() => Npc, (npcs) => npcs.spells)
    npcs: Npc[];
}
