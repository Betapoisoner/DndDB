import { AppDataSource } from '../data-source';
import { NextFunction, Request, Response } from 'express';
import { Character } from '../entity/Character';

export class CharacterController {
    private characterRepository = AppDataSource.getRepository(Character);

    async all(request: Request, response: Response, next: NextFunction) {
        let characters = await this.characterRepository.find({
            relations: {
                alignment: true,
                campaigns: true,
                patrons: true,
                skills: true,
                spells: true,
                inventory: true,
            },
        });
        return {
            status: 200,
            characters: characters,
        };
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id);

        const character = await this.characterRepository.findOne({
            where: { id },
            relations: {
                alignment: true,
                campaigns: true,
                patrons: true,
                skills: true,
                spells: true,
                inventory: true,
            },
        });

        if (!character) {
            return {
                status: 404,
                error: 'Unregistered character',
            };
        }
        return {
            status: 200,
            character: character,
        };
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id);

        let characterToRemove = await this.characterRepository.findOneBy({ id });

        if (!characterToRemove) {
            return {
                status: 404,
                error: 'This character does not exist',
            };
        }

        await this.characterRepository.remove(characterToRemove).catch((error) => {
            return {
                status: 500,
                error: error,
            };
        });

        return {
            status: 200,
            message: 'Character has been removed',
        };
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const {
            armor_class,
            background,
            charisma,
            class: characterClass, // Rename to avoid conflict with class keyword
            constitution,
            dexterity,
            equipment,
            experience,
            gold,
            hit_points,
            initiative,
            intelligence,
            level,
            name,
            notes,
            proficiency_bonus,
            race,
            photo,
            speed,
            strength,
            wisdom,
            damage_resistances,
            damage_immunities,
            condition_immunities,
            armor_desc,
            alignment,
            campaigns,
            patrons,
            skills,
            spells,
            inventory,
        } = request.body;

        const character = Object.assign(new Character(), {
            armor_class,
            background,
            charisma,
            class: characterClass,
            constitution,
            dexterity,
            equipment,
            experience,
            gold,
            hit_points,
            initiative,
            intelligence,
            level,
            name,
            notes,
            proficiency_bonus,
            race,
            photo,
            speed,
            strength,
            wisdom,
            damage_resistances,
            damage_immunities,
            condition_immunities,
            armor_desc,
            alignment,
            campaigns,
            patrons,
            skills,
            spells,
            inventory,
        });

        return await this.characterRepository
            .save(character)
            .catch((error) => {
                return {
                    status: 500,
                    error: error,
                };
            })
            .then((characterReturn) => {
                return {
                    status: 200,
                    character: characterReturn,
                };
            });
    }

    async update(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id);

        const characterToUpdate = await this.characterRepository.findOne({
            where: { id },
            relations: {
                alignment: true,
                campaigns: true,
                patrons: true,
                skills: true,
                spells: true,
                inventory: true,
            },
        });

        if (!characterToUpdate) {
            return {
                status: 404,
                error: 'This character does not exist',
            };
        }

        const {
            armor_class,
            background,
            charisma,
            class: characterClass,
            constitution,
            dexterity,
            equipment,
            experience,
            gold,
            hit_points,
            initiative,
            intelligence,
            level,
            name,
            notes,
            proficiency_bonus,
            race,
            photo,
            speed,
            strength,
            wisdom,
            damage_resistances,
            damage_immunities,
            condition_immunities,
            armor_desc,
            alignment,
            campaigns,
            patrons,
            skills,
            spells,
            inventory,
        } = request.body;

        if (armor_class !== undefined) characterToUpdate.armor_class = armor_class;
        if (background !== undefined) characterToUpdate.background = background;
        if (charisma !== undefined) characterToUpdate.charisma = charisma;
        if (characterClass !== undefined) characterToUpdate.class = characterClass;
        if (constitution !== undefined) characterToUpdate.constitution = constitution;
        if (dexterity !== undefined) characterToUpdate.dexterity = dexterity;
        if (equipment !== undefined) characterToUpdate.equipment = equipment;
        if (experience !== undefined) characterToUpdate.experience = experience;
        if (gold !== undefined) characterToUpdate.gold = gold;
        if (hit_points !== undefined) characterToUpdate.hit_points = hit_points;
        if (initiative !== undefined) characterToUpdate.initiative = initiative;
        if (intelligence !== undefined) characterToUpdate.intelligence = intelligence;
        if (level !== undefined) characterToUpdate.level = level;
        if (name !== undefined) characterToUpdate.name = name;
        if (notes !== undefined) characterToUpdate.notes = notes;
        if (proficiency_bonus !== undefined) characterToUpdate.proficiency_bonus = proficiency_bonus;
        if (race !== undefined) characterToUpdate.race = race;
        if (photo !== undefined) {
            characterToUpdate.photo = photo.bufferField.toString('base64');
        }
        if (speed !== undefined) characterToUpdate.speed = speed;
        if (strength !== undefined) characterToUpdate.strength = strength;
        if (wisdom !== undefined) characterToUpdate.wisdom = wisdom;
        if (damage_resistances !== undefined) characterToUpdate.damage_resistances = damage_resistances;
        if (damage_immunities !== undefined) characterToUpdate.damage_immunities = damage_immunities;
        if (condition_immunities !== undefined) characterToUpdate.condition_immunities = condition_immunities;
        if (armor_desc !== undefined) characterToUpdate.armor_desc = armor_desc;
        if (alignment !== undefined) characterToUpdate.alignment = alignment;
        if (campaigns !== undefined && Array.isArray(campaigns)) characterToUpdate.campaigns = campaigns;
        if (patrons !== undefined && Array.isArray(patrons)) characterToUpdate.patrons = patrons;
        if (skills !== undefined && Array.isArray(skills)) characterToUpdate.skills = skills;
        if (spells !== undefined && Array.isArray(spells)) characterToUpdate.spells = spells;
        if (inventory !== undefined) characterToUpdate.inventory = inventory;

        return await this.characterRepository
            .save(characterToUpdate)
            .catch((error) => {
                return {
                    status: 500,
                    error: error,
                };
            })
            .then((characterReturn) => {
                return {
                    status: 200,
                    character: characterReturn,
                };
            });
    }
}
