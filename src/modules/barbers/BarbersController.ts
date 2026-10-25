import type { Request, Response } from 'express';

import {
    barberIdParamSchema,
    createBarberSchema,
    listBarbersQuerySchema,
    updateBarberSchema,
} from './schemas/barber.schemas.js';
import type { CreateBarberUseCase } from './useCases/CreateBarberUseCase.js';
import type { DeactivateBarberUseCase } from './useCases/DeactivateBarberUseCase.js';
import type { GetBarberUseCase } from './useCases/GetBarberUseCase.js';
import type { ListBarbersUseCase } from './useCases/ListBarbersUseCase.js';
import type { UpdateBarberUseCase } from './useCases/UpdateBarberUseCase.js';

export class BarbersController {
    constructor(
        private createBarberUseCase: CreateBarberUseCase,
        private listBarbersUseCase: ListBarbersUseCase,
        private getBarberUseCase: GetBarberUseCase,
        private updateBarberUseCase: UpdateBarberUseCase,
        private deactivateBarberUseCase: DeactivateBarberUseCase,
    ) {}

    // POST /barbers
    create = async (req: Request, res: Response) => {
        const data = createBarberSchema.parse(req.body);
        const barber = await this.createBarberUseCase.execute(data);
        res.status(201).json(barber);
    };

    // GET /barbers?active=true
    list = async (req: Request, res: Response) => {
        // 🆕 aqui validamos o req.query, e não o req.body
        const { active } = listBarbersQuerySchema.parse(req.query);
        const barbers = await this.listBarbersUseCase.execute(active);
        res.json(barbers);
    };

    // GET /barbers/:id
    show = async (req: Request, res: Response) => {
        const { id } = barberIdParamSchema.parse(req.params);
        const barber = await this.getBarberUseCase.execute(id);
        res.json(barber);
    };

    // PATCH /barbers/:id
    update = async (req: Request, res: Response) => {
        const { id } = barberIdParamSchema.parse(req.params);
        const data = updateBarberSchema.parse(req.body);
        const barber = await this.updateBarberUseCase.execute(id, data);
        res.json(barber);
    };

    // DELETE /barbers/:id → desativa (soft delete)
    deactivate = async (req: Request, res: Response) => {
        const { id } = barberIdParamSchema.parse(req.params);
        await this.deactivateBarberUseCase.execute(id);
        res.status(204).send();
    };
}
