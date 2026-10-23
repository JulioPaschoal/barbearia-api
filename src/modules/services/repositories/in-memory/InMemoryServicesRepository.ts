import { randomUUID } from 'node:crypto';

import type { Service } from '../../entities/Service.js';
import type {
    createServiceDTO,
    UpdateServiceDTO,
} from '../../schemas/service.schemas.js';
import type { IServicesRepository } from '../IServicesRepository.js';

//"IMPLEMENTS" OBRIGA A CLASSE A CUMPRIR O CONTRATO
// SE FALTAR UM MÉTODO O TYPESCRIPT RECLAMA
export class InMemoryServicesRepository implements IServicesRepository {
    private services: Service[] = [];

    async create(data: createServiceDTO): Promise<Service> {
        const now = new Date();

        const service: Service = {
            id: randomUUID(),
            name: data.name,
            description: data.description ?? null,
            priceInCents: data.priceInCents,
            durationInMinutes: data.durationInMinutes,
            active: true,
            createdAt: now,
            updatedAt: now,
        };
        this.services.push(service);
        return service;
    }

    async findById(id: string): Promise<Service | null> {
        return this.services.find((service) => service.id === id) ?? null;
    }

    async findByName(name: string): Promise<Service | null> {
        // COMPARA SEM DIFERENCIAR MAIUSCULAS/MINUCULAS:
        return (
            this.services.find(
                (service) => service.name.toLowerCase() === name.toLowerCase(),
            ) ?? null
        );
    }

    async findAll(): Promise<Service[]> {
        return [...this.services]; // DEVOLVE UMA COPIA PARA NINGUEM ALTERAR O ARRAY POR FORA
    }

    async update(id: string, data: UpdateServiceDTO): Promise<Service> {
        const index = this.services.findIndex((service) => service.id === id);
        // SPREAD: PEGA TUSO DO ANTIGO E SOBRESCREVE COM O QUE VEIO NO DATA
        const updated: Service = {
            ...this.services[index],
            ...data,
            updatedAt: new Date(),
        };
        this.services[index] = updated;
        return updated;
    }

    async delete(id: string): Promise<void> {
        this.services = this.services.filter((service) => service.id !== id);
    }
}
