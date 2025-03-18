import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Item } from "../entity/Item";

export class ItemController {
    private itemRepository = AppDataSource.getRepository(Item);

    async all(request: Request, response: Response, next: NextFunction) {
        let items = await this.itemRepository.find({
            relations: {
                iventories: true,
                rewards: true,
            },
        });
        return {
            "status": 200,
            "items": items,
        };
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id);

        const item = await this.itemRepository.findOne({
            where: { id },
            relations: {
                iventories: true,
                rewards: true,
            },
        });

        if (!item) {
            return {
                "status": 404,
                "error": "Unregistered item",
            };
        }
        return {
            "status": 200,
            "item": item,
        };
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id);

        let itemToRemove = await this.itemRepository.findOneBy({ id });

        if (!itemToRemove) {
            return {
                "status": 404,
                "error": "This item does not exist",
            };
        }

        await this.itemRepository.remove(itemToRemove).catch(error => {
            return {
                "status": 500,
                "error": error,
            };
        });

        return {
            "status": 200,
            "message": "Item has been removed",
        };
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const {
            description,
            name,
            quantity,
            rarity,
            type,
            value,
            weight,
            photo,
            iventories,
            rewards,
        } = request.body;

        const item = Object.assign(new Item(), {
            description,
            name,
            quantity,
            rarity,
            type,
            value,
            weight,
            photo,
            iventories,
            rewards,
        });

        return await this.itemRepository.save(item).catch(error => {
            return {
                "status": 500,
                "error": error,
            };
        }).then(itemReturn => {
            return {
                "status": 200,
                "item": itemReturn,
            };
        });
    }

    async update(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id);

        const itemToUpdate = await this.itemRepository.findOne({
            where: { id },
            relations: {
                iventories: true,
                rewards: true,
            },
        });

        if (!itemToUpdate) {
            return {
                "status": 404,
                "error": "This item does not exist",
            };
        }

        const {
            description,
            name,
            quantity,
            rarity,
            type,
            value,
            weight,
            photo,
            iventories,
            rewards,
        } = request.body;

        if (description !== undefined) itemToUpdate.description = description;
        if (name !== undefined) itemToUpdate.name = name;
        if (quantity !== undefined) itemToUpdate.quantity = quantity;
        if (rarity !== undefined) itemToUpdate.rarity = rarity;
        if (type !== undefined) itemToUpdate.type = type;
        if (value !== undefined) itemToUpdate.value = value;
        if (weight !== undefined) itemToUpdate.weight = weight;
        if (photo !== undefined) {
            itemToUpdate.photo = photo.bufferField.toString('base64');
        }
        if (iventories !== undefined && Array.isArray(iventories)) itemToUpdate.iventories = iventories;
        if (rewards !== undefined && Array.isArray(rewards)) itemToUpdate.rewards = rewards;

        return await this.itemRepository.save(itemToUpdate).catch(error => {
            return {
                "status": 500,
                "error": error,
            };
        }).then(itemReturn => {
            return {
                "status": 200,
                "item": itemReturn,
            };
        });
    }
}