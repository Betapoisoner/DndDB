import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Event } from "../entity/Event";

export class EventController {
    private eventRepository = AppDataSource.getRepository(Event);

    async all(request: Request, response: Response, next: NextFunction) {
        let events = await this.eventRepository.find({
            relations: {
                session: true,
            },
        });
        return {
            "status": 200,
            "events": events,
        };
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id);

        const event = await this.eventRepository.findOne({
            where: { id },
            relations: {
                session: true,
            },
        });

        if (!event) {
            return {
                "status": 404,
                "error": "Unregistered event",
            };
        }
        return {
            "status": 200,
            "event": event,
        };
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id);

        let eventToRemove = await this.eventRepository.findOneBy({ id });

        if (!eventToRemove) {
            return {
                "status": 404,
                "error": "This event does not exist",
            };
        }

        await this.eventRepository.remove(eventToRemove).catch(error => {
            return {
                "status": 500,
                "error": error,
            };
        });

        return {
            "status": 200,
            "message": "Event has been removed",
        };
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const { date, description, event_type, session } = request.body;

        const event = Object.assign(new Event(), {
            date,
            description,
            event_type,
            session,
        });

        return await this.eventRepository.save(event).catch(error => {
            return {
                "status": 500,
                "error": error,
            };
        }).then(eventReturn => {
            return {
                "status": 200,
                "event": eventReturn,
            };
        });
    }

    async update(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id);

        const eventToUpdate = await this.eventRepository.findOne({
            where: { id },
            relations: {
                session: true,
            },
        });

        if (!eventToUpdate) {
            return {
                "status": 404,
                "error": "This event does not exist",
            };
        }

        const { date, description, event_type, session } = request.body;

        if (date !== undefined) eventToUpdate.date = date;
        if (description !== undefined) eventToUpdate.description = description;
        if (event_type !== undefined) eventToUpdate.event_type = event_type;
        if (session !== undefined) eventToUpdate.session = session;

        return await this.eventRepository.save(eventToUpdate).catch(error => {
            return {
                "status": 500,
                "error": error,
            };
        }).then(eventReturn => {
            return {
                "status": 200,
                "event": eventReturn,
            };
        });
    }
}