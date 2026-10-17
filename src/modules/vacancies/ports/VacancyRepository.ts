import { NewVacancy, Vacancy } from "../domain/Vacancy";

export interface VacancyRepository {
    findAll:() => Promise <Vacancy[]>;

    save: (newVacancy: NewVacancy) => Promise<Vacancy>;
}