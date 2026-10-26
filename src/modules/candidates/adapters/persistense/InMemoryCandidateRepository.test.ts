// src/modules/candidates/adapters/persistence/InMemoryCandidateRepository.test.ts
import { InMemoryCandidateRepository } from "./InMemoryCandidateRepository";

describe("InMemoryCandidateRepository", () => {
  let repository: InMemoryCandidateRepository;

  beforeEach(() => {
    repository = new InMemoryCandidateRepository();
  });

  it("debería guardar y listar candidatos", async () => {
    const newCandidate = { name: "Ana López", email: "ana.lopez@example.com", city: "Quito", experienceYears: 2 };
    const saved = await repository.save(newCandidate);
    const list = await repository.findAll();

    expect(saved.id).toBe(1);
    expect(list).toHaveLength(1);
    expect(list[0]).toEqual(saved);
  });

  it("debería buscar un candidato por id", async () => {
    const saved = await repository.save({ name: "Luis Torres", email: "luis.torres@example.com", city: "Cuenca", experienceYears: 3 });
    const found = await repository.findById(saved.id);

    expect(found).toEqual(saved);
  });

  it("debería actualizar un candidato", async () => {
    const saved = await repository.save({ name: "Luis Torres", email: "luis.torres@example.com", city: "Cuenca", experienceYears: 3 });
    const updated = await repository.update(saved.id, { name: "Luis Actualizado", email: "luis.torres@example.com", city: "Cuenca", experienceYears: 4 });

    expect(updated?.name).toBe("Luis Actualizado");
    expect(updated?.experienceYears).toBe(4);
  });

  it("debería eliminar un candidato", async () => {
    const saved = await repository.save({ name: "Carlos Vera", email: "carlos.vera@example.com", city: "Ambato", experienceYears: 1 });
    const deleted = await repository.remove(saved.id);
    const found = await repository.findById(saved.id);

    expect(deleted).toBe(true);
    expect(found).toBeNull();
  });
});