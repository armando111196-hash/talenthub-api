// src/modules/candidates/ports/CandidateRepository.ts
import { Candidate, NewCandidate } from "../domain/Candidate";

export interface CandidateRepository {
  findAll(): Promise<Candidate[]>;
  findById(id: number): Promise<Candidate | null>;
  save(candidate: NewCandidate): Promise<Candidate>;
  update(id: number, candidate: NewCandidate): Promise<Candidate | null>;
  remove(id: number): Promise<boolean>;
}