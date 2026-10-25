import type { Barber } from '../entities/Barber.js';
import type { CreateBarberDTO } from '../schemas/barber.schemas.js';

export type UpdateBarberData = Partial<
    Omit<Barber, 'id' | 'createdAt' | 'updatedAt'>
>;

export interface IBarbersRepository {
    create(data: CreateBarberDTO): Promise<Barber>;
    findById(id: string): Promise<Barber | null>;
    findByEmail(email: string): Promise<Barber | null>;
    // O "?" DEIXA O PARAMETRO OPCIONAL: PODE CHAMAR FINDALL() OU FINDALL({onlyActive: true})
    findAll(filters?: { onlyActive?: boolean }): Promise<Barber[]>;
    update(id: string, data: UpdateBarberData): Promise<Barber>;
}
