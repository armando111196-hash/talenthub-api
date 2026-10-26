// src/modules/candidates/adapters/persistence/InMemoryCandidateRepository.ts
import { Candidate, NewCandidate } from "../../domain/Candidate";
import { CandidateRepository } from "../../ports/CandidateRepository";

export class InMemoryCandidateRepository implements CandidateRepository {
  private candidates: Candidate[] = [];
  private nextId = 1;

  async findAll(): Promise<Candidate[]> {
    return this.candidates.map((c) => ({ ...c }));
  }

  async findById(id: number): Promise<Candidate | null> {
    const found = this.candidates.find((c) => c.id === id);
    return found ? { ...found } : null;
  }

  async save(candidateData: NewCandidate): Promise<Candidate> {
    const newCandidate: Candidate = {
      id: this.nextId++,
      ...candidateData,
    };
    this.candidates.push(newCandidate);
    return { ...newCandidate };
  }

  async update(id: number, candidateData: NewCandidate): Promise<Candidate | null> {
    const index = this.candidates.findIndex((c) => c.id === id);
    if (index === -1) return null;

    const updated: Candidate = {
      id,
      ...candidateData,
    };
    this.candidates[index] = updated;
    return { ...updated };
  }

  async remove(id: number): Promise<boolean> {
    const index = this.candidates.findIndex((c) => c.id === id);
    if (index === -1) return false;
    this.candidates.splice(index, 1);
    return true;
  }
}