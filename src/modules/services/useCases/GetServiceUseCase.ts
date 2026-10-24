import { NotFoundError } from '../../../shared/errors/NotFoundError.js';
import type { Service } from '../entities/Service.js';
import type { IServicesRepository } from '../repositories/IServicesRepository.js';

export class GetServiceUseCase {
    constructor(private servicesRepository: IServicesRepository) {}

    async execute(id: string): Promise<Service> {
        const service = await this.servicesRepository.findById(id);

        if (!service) {
            throw new NotFoundError('Serviço');
        }
        return service;
    }
}
