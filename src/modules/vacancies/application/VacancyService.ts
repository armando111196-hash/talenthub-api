import { parseNewVacancy, Vacancy, NewVacancy } from '../domain/Vacancy';

import { VacancyRepository } from "../ports/VacancyRepository";

export class VancacyService {
    constructor (private readonly repository: VacancyRepository){}

    //CASO 1: listar vancantes
    list = async (): Promise<Vacancy[]> => this.repository.findAll();

    //CASO 2: crear una vacante.
    create = async (input: unknown): Promise<Vacancy> =>{
        const newVacancy = parseNewVacancy(input);
        return this.repository.save(newVacancy);
    }
}