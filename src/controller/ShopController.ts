import { AppDataSource } from '../data-source';
import { NextFunction, Request, Response } from 'express';
import { Shop } from '../entity/Shop';

export class ShopController {
    private shopRepository = AppDataSource.getRepository(Shop);

    async all(request: Request, response: Response, next: NextFunction) {
        try {
            // Fetch shops from the repository
            let shops = await this.shopRepository.find({
                relations: {
                    inventory: true,
                    town: true,
                },
            });

            // Send the response with status code 200 and the shops data
            response.status(200).json({
                status: 200,
                shops: shops,
            });
        } catch (error) {
            console.log(error);
            response.status(500).json({
                status: 500,
                error: error,
            });
        }
    }

    async one(request: Request, response: Response, next: NextFunction) {
        try {
            const id = parseInt(request.params.id);

            const shop = await this.shopRepository.findOne({
                where: { id },
                relations: {
                    inventory: true,
                    town: true,
                },
            });

            if (!shop) {
                response.status(404).json({
                    status: 404,
                    error: 'Unregistered shop',
                });
            }
            response.status(200).json({
                status: 200,
                shop: shop,
            });
        } catch (error) {
            console.log(error);
            response.status(500).json({
                status: 500,
                error: error,
            });
        }
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id);

        let shopToRemove = await this.shopRepository.findOneBy({ id });

        if (!shopToRemove) {
            return {
                status: 404,
                error: 'This shop does not exist',
            };
        }

        await this.shopRepository.remove(shopToRemove).catch((error) => {
            return {
                status: 500,
                error: error,
            };
        });

        return {
            status: 200,
            message: 'Shop has been removed',
        };
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const { name, type, inventory, town } = request.body;

        const shop = Object.assign(new Shop(), {
            name,
            type,
            inventory,
            town,
        });

        return await this.shopRepository
            .save(shop)
            .catch((error) => {
                return {
                    status: 500,
                    error: error,
                };
            })
            .then((shopReturn) => {
                return {
                    status: 200,
                    shop: shopReturn,
                };
            });
    }

    async update(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id);

        const shopToUpdate = await this.shopRepository.findOne({
            where: { id },
            relations: {
                inventory: true,
                town: true,
            },
        });

        if (!shopToUpdate) {
            return {
                status: 404,
                error: 'This shop does not exist',
            };
        }

        const { name, type, inventory, town } = request.body;

        if (name !== undefined) shopToUpdate.name = name;
        if (type !== undefined) shopToUpdate.type = type;
        if (inventory !== undefined) shopToUpdate.inventory = inventory;
        if (town !== undefined) shopToUpdate.town = town;

        return await this.shopRepository
            .save(shopToUpdate)
            .catch((error) => {
                return {
                    status: 500,
                    error: error,
                };
            })
            .then((shopReturn) => {
                return {
                    status: 200,
                    shop: shopReturn,
                };
            });
    }
}
