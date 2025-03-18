import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Bbeg } from "../entity/Bbeg";

export class BbegController {
	private userRepository = AppDataSource.getRepository(Bbeg);

	async all(request: Request, response: Response, next: NextFunction) {
		let bbegs = await this.userRepository.find({
			relations: {
				actions: true,
				dungeons: true,
				lair_actions: true,
				skills: true,
				spells: true,
				inventory: true
			}
		})
		return  {
			"status": 200,
			"bbegs": bbegs
		}
	}

	async one(request: Request, response: Response, next: NextFunction) {
		const id = parseInt(request.params.id);

		const bbeg = await this.userRepository.findOne({
			where: { id },
			relations: {
				actions: true,
				dungeons: true,
				lair_actions: true,
				skills: true,
				spells: true,
				inventory: true
			}
		});

		if (!bbeg) {
			return {
				"status": 404,
				"error": "Unregeistered bbeg"
			}
		}
		return await {
			"status": 200,
			"bbeg":bbeg
		}
	}

	async remove(request: Request, response: Response, next: NextFunction) {
		const id = parseInt(request.params.id);

		let bbegToRemove = await this.userRepository.findOneBy({ id });

		if (!bbegToRemove) {
			return "this bbeg does not exist";
		}


		await this.userRepository.remove(bbegToRemove).catch(error => {
			return {
				"status": 500,
				"error": error
			}
		});

		return {
			"status": 200,
			"message":"bbeg has been removed"
		}
	}

	async save(request: Request, response: Response, next: NextFunction) {
		const {
			name,
			photo,
			challenge_rating,
			experience_points,
			size,
			type,
			armor_class,
			hit_points,
			speed,
			strength,
			dexterity,
			constitution,
			intelligence,
			wisdom,
			charisma,
			senses,
			languages,
			challenge,
			alignment,
			damage_resistances,
			damage_immunities,
			condition_immunities,
			armor_desc,
			actions,
			dungeons,
			lair_actions,
			skills,
			spells,
			inventory
		} = request.body;

		const bbeg = Object.assign(new Bbeg(), {
			name,photo,
			challenge_rating,
			experience_points,
			size,
			type,
			armor_class,
			hit_points,
			speed,
			strength,
			dexterity,
			constitution,
			intelligence,
			wisdom,
			charisma,
			senses,
			languages,
			challenge,
			alignment,
			damage_resistances,
			damage_immunities,
			condition_immunities,
			armor_desc,
			actions,
			dungeons,
			lair_actions,
			skills,
			spells,
			inventory
		}
		);
		return await this.userRepository.save(bbeg).catch(error => {
			return {
				"status": 500,
				"error": error
			}
		}).then(BbegReturn => {
			return {
				"status": 200,
				"bbeg": BbegReturn,
			}
		});

	}
	async update(request: Request, response: Response, next: NextFunction) {

		const id = parseInt(request.params.id);

		const bbegToUpdate = await this.userRepository.findOne({ where: { id },relations: {
			actions: true,
			dungeons: true,
			lair_actions: true,
			skills: true,
			spells: true,
			inventory: true
		} });

		if (!bbegToUpdate) {
			return{
				"status": 404,
				"error":  "This bbeg does not exist"
			}
		}

		const { // Destructure request body (more concise)
			name,photo, challenge_rating, experience_points, size, type, armor_class,
			hit_points, speed, strength, dexterity, constitution, intelligence,
			wisdom, charisma, senses, languages, challenge, alignment,
			damage_resistances, damage_immunities, condition_immunities,
			armor_desc, actions, dungeons, lair_actions, skills, spells, inventory
		} = request.body;

		// Update only if the value is not null or undefined AND the length is greater than 0 for arrays
		if (name !== undefined) bbegToUpdate.name = name;
		if (photo !== undefined) {
			bbegToUpdate.photo = photo.bufferField.toString('base64');
		}
		if (challenge_rating !== undefined) bbegToUpdate.challenge_rating = challenge_rating;
		if (experience_points !== undefined) bbegToUpdate.experience_points = experience_points;
		if (size !== undefined) bbegToUpdate.size = size;
		if (type !== undefined) bbegToUpdate.type = type;
		if (armor_class !== undefined) bbegToUpdate.armor_class = armor_class;
		if (hit_points !== undefined) bbegToUpdate.hit_points = hit_points;
		if (speed !== undefined) bbegToUpdate.speed = speed;
		if (strength !== undefined) bbegToUpdate.strength = strength;
		if (dexterity !== undefined) bbegToUpdate.dexterity = dexterity;
		if (constitution !== undefined) bbegToUpdate.constitution = constitution;
		if (intelligence !== undefined) bbegToUpdate.intelligence = intelligence;
		if (wisdom !== undefined) bbegToUpdate.wisdom = wisdom;
		if (charisma !== undefined) bbegToUpdate.charisma = charisma;
		if (senses !== undefined) bbegToUpdate.senses = senses;
		if (languages !== undefined) bbegToUpdate.languages = languages;
		if (challenge !== undefined) bbegToUpdate.challenge = challenge;
		if (alignment !== undefined) bbegToUpdate.alignment = alignment;
		if (damage_resistances !== undefined) bbegToUpdate.damage_resistances = damage_resistances;
		if (damage_immunities !== undefined) bbegToUpdate.damage_immunities = damage_immunities;
		if (condition_immunities !== undefined) bbegToUpdate.condition_immunities = condition_immunities;
		if (armor_desc !== undefined) bbegToUpdate.armor_desc = armor_desc;
		if (inventory !== undefined) bbegToUpdate.inventory = inventory;

		// Handle array updates with length check
		if (actions !== undefined && Array.isArray(actions) && actions.length > 0) bbegToUpdate.actions = actions;
		if (dungeons !== undefined && Array.isArray(dungeons) && dungeons.length > 0) bbegToUpdate.dungeons = dungeons;
		if (lair_actions !== undefined && Array.isArray(lair_actions) && lair_actions.length > 0) bbegToUpdate.lair_actions = lair_actions;
		if (skills !== undefined && Array.isArray(skills) && skills.length > 0) bbegToUpdate.skills = skills;
		if (spells !== undefined && Array.isArray(spells) && spells.length > 0) bbegToUpdate.spells = spells;



		return await this.userRepository.save(bbegToUpdate).catch(error => {
			return {
				"status": 500,
				"error": error
			}
		}).then(BbegReturn => {
			return {
				"status": 200,
				"bbeg": BbegReturn,
			}
		});

	}

}