import type { Barber } from '../entities/Barber.js';
import type { IBarbersRepository } from '../repositories/IBarbersRepository.js';

export class ListBarbersUseCase {
    constructor(private barbersRepository: IBarbersRepository) {}

    // onlyActive é opcional: sem ele, lista todos
    async execute(onlyActive?: boolean): Promise<Barber[]> {
        return this.barbersRepository.findAll({ onlyActive });
    }
}
