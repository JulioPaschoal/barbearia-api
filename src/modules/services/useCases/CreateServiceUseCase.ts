import { ConflictError } from '../../../shared/errors/ConflictError.js';
import type { Service } from '../entities/Service.js';
import type { IServicesRepository } from '../repositories/IServicesRepository.js';
import type { createServiceDTO } from '../schemas/service.schemas.js';

export class CreateServiceUseCase {
    //PRIVATE NO PARAMETRO DO CONSTRUTOR JÁ CRIA E PREENCHE O this.ServicesRepository
    constructor(private servicesRepository: IServicesRepository) {}

    async execute(data: createServiceDTO): Promise<Service> {
        //REGRA DE NEGOCIO NOME UNICO
        const alreadyExists = await this.servicesRepository.findByName(
            data.name,
        );
        if (alreadyExists) {
            throw new ConflictError('Já existe um serviço com esse nome');
        }
        return this.servicesRepository.create(data);
    }
}
