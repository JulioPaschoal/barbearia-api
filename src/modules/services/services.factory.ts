import { InMemoryServicesRepository } from './repositories/in-memory/InMemoryServicesRepository.js';
import { ServicesController } from './ServicesController.js';
import { CreateServiceUseCase } from './useCases/CreateServiceUseCase.js';
import { DeleteServiceUseCase } from './useCases/DeleteServiceUseCase.js';
import { GetServiceUseCase } from './useCases/GetServiceUseCase.js';
import { ListServicesUseCase } from './useCases/ListServicesUseCase.js';
import { UpdateServiceUseCase } from './useCases/UpdateServiceUseCase.js';

//FACTORY: O UNICO LUGAR QUE SABE QUAIS IMPLEMENTAÇÂO CONCTRETAS USAR
export function makeServicesController() {
    // UMA INSTANCIA COMPARTILHADA TODOS OS USE CASES ENXERGAM O MESMO ARRY
    const servicesRepository = new InMemoryServicesRepository();

    return new ServicesController(
        new CreateServiceUseCase(servicesRepository),
        new ListServicesUseCase(servicesRepository),
        new GetServiceUseCase(servicesRepository),
        new UpdateServiceUseCase(servicesRepository),
        new DeleteServiceUseCase(servicesRepository),
    );
}
