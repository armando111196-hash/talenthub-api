// src/modules/candidates/application/CandidateService.ts
import { CandidateRepository } from "../ports/CandidateRepository";
import { Candidate, NewCandidate, parseNewCandidate } from "../domain/Candidate";
import { NotFoundError } from "../../../shared/NotFoundError";

export class CandidateService {
  constructor(private readonly candidateRepository: CandidateRepository) {}

  readonly list = async (): Promise<Candidate[]> => {
    return await this.candidateRepository.findAll();
  };

  readonly getById = async (id: number): Promise<Candidate> => {
    const candidate = await this.candidateRepository.findById(id);
    if (!candidate) {
      throw new NotFoundError("Candidato no encontrado");
    }
    return candidate;
  };

  readonly create = async (data: unknown): Promise<Candidate> => {
    const parsedCandidate: NewCandidate = parseNewCandidate(data);
    return await this.candidateRepository.save(parsedCandidate);
  };

  readonly update = async (id: number, data: unknown): Promise<Candidate> => {
    await this.getById(id); // Lanza NotFoundError si no existe
    const parsedCandidate: NewCandidate = parseNewCandidate(data);
    const updated = await this.candidateRepository.update(id, parsedCandidate);
    if (!updated) {
      throw new NotFoundError("Candidato no encontrado");
    }
    return updated;
  };

  readonly remove = async (id: number): Promise<void> => {
    await this.getById(id); // Lanza NotFoundError si no existe
    await this.candidateRepository.remove(id);
  };
}