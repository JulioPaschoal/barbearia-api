import type { Service } from '../entities/Service.js';
import type { IServicesRepository } from '../repositories/IServicesRepository.js';

export class ListServicesUseCase {
    constructor(private servicesRepository: IServicesRepository) {}

    async execute(): Promise<Service[]> {
        return this.servicesRepository.findAll();
    }
}
