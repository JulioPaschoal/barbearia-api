import type { Request, Response } from 'express';

import {
    createServiceSchema,
    serviceIdParamSchema,
    updateServiceSchema,
} from './schemas/service.schemas.js';
import type { CreateServiceUseCase } from './useCases/CreateServiceUseCase.js';
import type { DeleteServiceUseCase } from './useCases/DeleteServiceUseCase.js';
import type { GetServiceUseCase } from './useCases/GetServiceUseCase.js';
import type { ListServicesUseCase } from './useCases/ListServicesUseCase.js';
import type { UpdateServiceUseCase } from './useCases/UpdateServiceUseCase.js';

// O CONTROLLER É O TRADUTOR ENTRE O HTTP E OS USE CASES
// ELE NÂO TEM REGRA DE NEGOCIO SO LE A REQUISIÇÃO CHMA O USE CASE E RESPONDE.
export class ServicesController {
    constructor(
        private createServiceUseCase: CreateServiceUseCase,
        private listServicesUseCase: ListServicesUseCase,
        private getServiceUseCase: GetServiceUseCase,
        private updateServiceUseCase: UpdateServiceUseCase,
        private deleteServiceUseCase: DeleteServiceUseCase,
    ) {}

    // ARROW FUNCTION = O THIS SEMPRE APONTA PARA O CONTROLLER
    // MESMO QUANDO O EXPRESS CHAMA O METODO SOLTO LA NAS ROTAS
    create = async (req: Request, res: Response) => {
        const data = createServiceSchema.parse(req.body);
        const service = await this.createServiceUseCase.execute(data);
        res.status(201).json(service);
    };

    list = async (_req: Request, res: Response) => {
        const services = await this.listServicesUseCase.execute();
        res.json(services);
    };

    show = async (req: Request, res: Response) => {
        const { id } = serviceIdParamSchema.parse(req.params);
        const service = await this.getServiceUseCase.execute(id);
        res.json(service);
    };

    update = async (req: Request, res: Response) => {
        const { id } = serviceIdParamSchema.parse(req.params);
        const data = updateServiceSchema.parse(req.body);
        const service = await this.updateServiceUseCase.execute(id, data);
        res.json(service);
    };

    remove = async (req: Request, res: Response) => {
        const { id } = serviceIdParamSchema.parse(req.params);
        await this.deleteServiceUseCase.execute(id);
        res.status(204).send();
    };
}
