import { randomUUID } from 'node:crypto';

import type { Barber } from '../../entities/Barber.js';
import type { CreateBarberDTO } from '../../schemas/barber.schemas.js';
import type {
    IBarbersRepository,
    UpdateBarberData,
} from '../IBarbersRepository.js';

export class InMemoryBarbersRepository implements IBarbersRepository {
    private barbers: Barber[] = [];

    async create(data: CreateBarberDTO): Promise<Barber> {
        const now = new Date();

        const barber: Barber = {
            id: randomUUID(),
            name: data.name,
            email: data.email.toLowerCase(), // 🆕 salva o e-mail sempre em minúsculas
            phone: data.phone ?? null, // phone é opcional no DTO, mas na entidade é string | null
            workDays: data.workDays,
            startTime: data.startTime,
            endTime: data.endTime,
            active: true, // todo barbeiro começa ativo
            createdAt: now,
            updatedAt: now,
        };

        this.barbers.push(barber);
        return barber;
    }

    async findById(id: string): Promise<Barber | null> {
        return this.barbers.find((barber) => barber.id === id) ?? null;
    }

    async findByEmail(email: string): Promise<Barber | null> {
        // Os e-mails salvos já estão em minúsculas,
        // então basta converter o que está sendo buscado
        return (
            this.barbers.find(
                (barber) => barber.email === email.toLowerCase(),
            ) ?? null
        );
    }
    // 🆕 "= {}" é um valor padrão: se chamar findAll() sem nada, filters vira {}
    async findAll(filters: { onlyActive?: boolean } = {}): Promise<Barber[]> {
        if (filters.onlyActive) {
            return this.barbers.filter((barber) => barber.active);
        }
        return [...this.barbers];
    }
    async update(id: string, data: UpdateBarberData): Promise<Barber> {
        const index = this.barbers.findIndex((barber) => barber.id === id);
        const updated: Barber = {
            ...this.barbers[index], // 1. copia tudo o que já existia
            ...data, // 2. sobrescreve só o que veio no data
            updatedAt: new Date(), // 3. atualiza a data de modificação
        };
        // 🆕 Se o e-mail mudou, também salvamos em minúsculas
        if (data.email) {
            updated.email = data.email.toLowerCase();
        }
        this.barbers[index] = updated;
        return updated;
    }
}
