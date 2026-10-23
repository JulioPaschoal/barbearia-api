import type { Service } from '../entities/Service.js';
import type {
    createServiceDTO,
    UpdateServiceDTO,
} from '../schemas/service.schemas.js';

// CONTRATO: QUALQUER RESPOSITORY DE SERVIÇOS PRECISA SABER FAZER ISSO
// O USE CASE SÓ CONHECE ESTA INTERFACE NÃO A IMPLEMENTAÇÃO
export interface IServicesRepository {
    create(data: createServiceDTO): Promise<Service>;
    findById(id: string): Promise<Service | null>;
    findByName(name: string): Promise<Service | null>;
    findAll(): Promise<Service[]>;
    update(id: string, data: UpdateServiceDTO): Promise<Service>;
    delete(id: string): Promise<void>;
}
