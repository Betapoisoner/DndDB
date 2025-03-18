import { AppDataSource } from '../data-source';
import { NextFunction, Request, Response } from 'express';
import { Inventory } from '../entity/Inventory';

export class InventoryController {
    private inventoryRepository = AppDataSource.getRepository(Inventory);

    async all(request: Request, response: Response, next: NextFunction) {
        let inventories = await this.inventoryRepository.find({
            relations: {
                items: true,
            },
        });
        return {
            status: 200,
            inventories: inventories,
        };
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id);

        const inventory = await this.inventoryRepository.findOne({
            where: { id },
            relations: {
                items: true,
            },
        });

        if (!inventory) {
            return {
                status: 404,
                error: 'Unregistered inventory',
            };
        }
        return {
            status: 200,
            inventory: inventory,
        };
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id);

        let inventoryToRemove = await this.inventoryRepository.findOneBy({ id });

        if (!inventoryToRemove) {
            return {
                status: 404,
                error: 'This inventory does not exist',
            };
        }

        await this.inventoryRepository.remove(inventoryToRemove).catch((error) => {
            return {
                status: 500,
                error: error,
            };
        });

        return {
            status: 200,
            message: 'Inventory has been removed',
        };
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const { items } = request.body;

        const inventory = Object.assign(new Inventory(), {
            items,
        });

        return await this.inventoryRepository
            .save(inventory)
            .catch((error) => {
                return {
                    status: 500,
                    error: error,
                };
            })
            .then((inventoryReturn) => {
                return {
                    status: 200,
                    inventory: inventoryReturn,
                };
            });
    }

    async update(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id);

        const inventoryToUpdate = await this.inventoryRepository.findOne({
            where: { id },
            relations: {
                items: true,
            },
        });

        if (!inventoryToUpdate) {
            return {
                status: 404,
                error: 'This inventory does not exist',
            };
        }

        const { items } = request.body;

        if (items !== undefined && Array.isArray(items)) inventoryToUpdate.items = items;

        return await this.inventoryRepository
            .save(inventoryToUpdate)
            .catch((error) => {
                return {
                    status: 500,
                    error: error,
                };
            })
            .then((inventoryReturn) => {
                return {
                    status: 200,
                    inventory: inventoryReturn,
                };
            });
    }
}
