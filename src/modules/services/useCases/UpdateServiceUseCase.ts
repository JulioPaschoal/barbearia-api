import { ConflictError } from '../../../shared/errors/ConflictError.js';
import { NotFoundError } from '../../../shared/errors/NotFoundError.js';
import type { Service } from '../entities/Service.js';
import type { IServicesRepository } from '../repositories/IServicesRepository.js';
import type { UpdateServiceDTO } from '../schemas/service.schemas.js';

export class UpdateServiceUseCase {
    constructor(private serviceRepository: IServicesRepository) {}
    async execute(id: string, data: UpdateServiceDTO): Promise<Service> {
        const service = await this.serviceRepository.findById(id);
        if (!service) {
            throw new NotFoundError('Serviço');
        }
        // SE ESTA TROCANDO O NOME, ELE NAO PODE SER IGUAL AO DE OUTRO SERVIÇO
        if (data.name) {
            const sameName = await this.serviceRepository.findByName(data.name);
            if (sameName && sameName.id !== id) {
                throw new ConflictError('Já existe um serviço com esse nome');
            }
        }
        return this.serviceRepository.update(id, data);
    }
}
