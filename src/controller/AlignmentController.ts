import { AppDataSource } from '../data-source';
import { NextFunction, Request, Response } from 'express';
import { Alignment } from '../entity/Alignment';

export class AlignmentController {
    private alignmentRepository = AppDataSource.getRepository(Alignment);

    async all(request: Request, response: Response, next: NextFunction) {
        let alignments = await this.alignmentRepository.find();
        return {
            status: 200,
            alignments: alignments,
        };
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const alignment = request.params.alignment;

        const foundAlignment = await this.alignmentRepository.findOne({
            where: { alignment },
        });

        if (!foundAlignment) {
            return {
                status: 404,
                error: 'Unregistered alignment',
            };
        }
        return {
            status: 200,
            alignment: foundAlignment,
        };
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const alignment = request.params.alignment;

        let alignmentToRemove = await this.alignmentRepository.findOneBy({ alignment });

        if (!alignmentToRemove) {
            return {
                status: 404,
                error: 'This alignment does not exist',
            };
        }

        await this.alignmentRepository.remove(alignmentToRemove).catch((error) => {
            return {
                status: 500,
                error: error,
            };
        });

        return {
            status: 200,
            message: 'Alignment has been removed',
        };
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const { alignment, description } = request.body;

        const newAlignment = Object.assign(new Alignment(), {
            alignment,
            description,
        });

        return await this.alignmentRepository
            .save(newAlignment)
            .catch((error) => {
                return {
                    status: 500,
                    error: error,
                };
            })
            .then((alignmentReturn) => {
                return {
                    status: 200,
                    alignment: alignmentReturn,
                };
            });
    }

    async update(request: Request, response: Response, next: NextFunction) {
        const alignment = request.params.alignment;

        const alignmentToUpdate = await this.alignmentRepository.findOne({
            where: { alignment },
        });

        if (!alignmentToUpdate) {
            return {
                status: 404,
                error: 'This alignment does not exist',
            };
        }

        const { description } = request.body;

        if (description !== undefined) alignmentToUpdate.description = description;

        return await this.alignmentRepository
            .save(alignmentToUpdate)
            .catch((error) => {
                return {
                    status: 500,
                    error: error,
                };
            })
            .then((alignmentReturn) => {
                return {
                    status: 200,
                    alignment: alignmentReturn,
                };
            });
    }
}
