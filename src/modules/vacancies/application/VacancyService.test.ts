import { DomainError } from "../../../shared/DomainError";
import { InMemoryVacancyRepository } from "../adapters/persistence/InMemoryVacancyRepository";
import { VancacyService } from "./VacancyService";

//Datos de ejemplo válidos.
const validInput = {title: 'QA Tester', company: 'Tech Andes', modality: 'remoto', salary: 800};

describe('VacancyService', () => {
    it('creates a valid vancancy and returns it with an id', async () => {
        const service = new VancacyService(new InMemoryVacancyRepository());

        const created = await service.create(validInput);

        expect(created).toEqual({id: 1, ...validInput});
    });

    it('rejects an invalid vacancy and does not save it', async () =>{
        const service = new VancacyService(new InMemoryVacancyRepository());
        
        await expect(service.create({company: 'Tech Andes'})).rejects.toThrow(DomainError);

        expect(await service.list()).toEqual([]);
    });

    it('lists the vacancies that were created', async () => {
        const service = new VancacyService(new InMemoryVacancyRepository());

        await service.create(validInput);

        expect(await service.list()).toHaveLength(1);
    });
})