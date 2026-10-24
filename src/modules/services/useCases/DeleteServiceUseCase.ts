import { NotFoundError } from '../../../shared/errors/NotFoundError.js';
import type { IServicesRepository } from '../repositories/IServicesRepository.js';

export class DeleteServiceUseCase {
    constructor(private serviceRepository: IServicesRepository) {}
    async execute(id: string): Promise<void> {
        const service = await this.serviceRepository.findById(id);
        if (!service) {
            throw new NotFoundError('Serviço');
        }

        await this.serviceRepository.delete(id);
    }
}
