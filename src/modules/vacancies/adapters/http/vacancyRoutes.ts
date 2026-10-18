import { Router } from "express";

import { VancacyService } from '../../application/VacancyService';
import { HTTP_STATUS } from "../../../../shared/httpStatus";

export const createVacancyRouter = (service: VancacyService): Router =>{
    const router = Router();

    //GET /: listar vacantes
    router.get('/', async (req, res) => {
        const vacancies = await service.list();
        res.status(HTTP_STATUS.OK).json(vacancies);
    });

    //POST /: crear una vacante
    router.post('/', async (req, res)=>{
        const vacancy = await service.create(req.body);

        res.status(HTTP_STATUS.CREATED).json(vacancy);
    });

    return router;
}