import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Campaign } from "../entity/Campaign";

type UpdateCampaignDto = Partial<Campaign>;

export class CampaignController {
    private campaignRepository = AppDataSource.getRepository(Campaign);

    async all(request: Request, response: Response, next: NextFunction) {
        let campaigns = await this.campaignRepository.find({
            relations: {
                characters: true,
                sessions: true,
                worlds: true,
            },
        });
        return {
            "status": 200,
            "campaigns": campaigns,
        };
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id);

        const campaign = await this.campaignRepository.findOne({
            where: { id },
            relations: {
                characters: true,
                sessions: true,
                worlds: true,
            },
        });

        if (!campaign) {
            return {
                "status": 404,
                "error": "Unregistered campaign",
            };
        }
        return {
            "status": 200,
            "campaign": campaign,
        };
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id);

        let campaignToRemove = await this.campaignRepository.findOneBy({ id });

        if (!campaignToRemove) {
            return {
                "status": 404,
                "error": "This campaign does not exist",
            };
        }

        await this.campaignRepository.remove(campaignToRemove).catch(error => {
            return {
                "status": 500,
                "error": error,
            };
        });

        return {
            "status": 200,
            "message": "Campaign has been removed",
        };
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const {
            current_date,
            current_location,
            description,
            name,
            status,
            photo,
            characters,
            sessions,
            worlds,
        } = request.body;

        const campaign = Object.assign(new Campaign(), {
            current_date,
            current_location,
            description,
            name,
            status,
            photo,
            characters,
            sessions,
            worlds,
        });

        return await this.campaignRepository.save(campaign).catch(error => {
            return {
                "status": 500,
                "error": error,
            };
        }).then(campaignReturn => {
            return {
                "status": 200,
                "campaign": campaignReturn,
            };
        });
    }

    async update(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id);

        const campaignToUpdate = await this.campaignRepository.findOne({
            where: { id },
            relations: {
                characters: true,
                sessions: true,
                worlds: true,
            },
        }) as Campaign | null; // Explicitly type as Campaign or null

        if (!campaignToUpdate) {
            return response.status(404).json({
                "status": 404,
                "error": "This campaign does not exist",
            });
        }

        const updateData: UpdateCampaignDto = request.body; // Type request body as Partial<Campaign>

        const {
            current_date,
            current_location,
            description,
            name,
            status,
            photo,
            characters,
            sessions,
            worlds,
        } = updateData; // Destructure from updateData

        if (current_date !== undefined) campaignToUpdate.current_date = current_date;
        if (current_location !== undefined) campaignToUpdate.current_location = current_location;
        if (description !== undefined) campaignToUpdate.description = description;
        if (name !== undefined) campaignToUpdate.name = name;
        if (status !== undefined) campaignToUpdate.status = status;
        if (photo !== undefined) campaignToUpdate.photo = photo;
        if (characters !== undefined && Array.isArray(characters)) campaignToUpdate.characters = characters as any; // Type assertion if needed
        if (sessions !== undefined && Array.isArray(sessions)) campaignToUpdate.sessions = sessions as any; // Type assertion if needed
        if (worlds !== undefined && Array.isArray(worlds)) campaignToUpdate.worlds = worlds as any; // Type assertion if needed


        try {
            const campaignReturn = await this.campaignRepository.save(campaignToUpdate);
            return {
                "status": 200,
                "id": campaignReturn.id,
            };
        } catch (error) {
            return {
                "status": 500,
                "error": error,
            };
        }
    }
}