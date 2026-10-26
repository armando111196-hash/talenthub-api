// src/modules/candidates/application/CandidateService.test.ts
import { CandidateService } from "./CandidateService";
import { CandidateRepository } from "../ports/CandidateRepository";
import { NotFoundError } from "../../../shared/NotFoundError";

describe("CandidateService", () => {
  let service: CandidateService;
  let mockRepository: jest.Mocked<CandidateRepository>;

  beforeEach(() => {
    mockRepository = {
      findAll: jest.fn(),
      findById: jest.fn(),
      save: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };
    service = new CandidateService(mockRepository);
  });

  it("debería listar todos los candidatos", async () => {
    const candidates = [{ id: 1, name: "Juan Pérez", email: "juan@example.com", city: "Quito", experienceYears: 3 }];
    mockRepository.findAll.mockResolvedValue(candidates);

    const result = await service.list();
    expect(result).toEqual(candidates);
  });

  it("debería obtener un candidato por id", async () => {
    const candidate = { id: 1, name: "Juan Pérez", email: "juan@example.com", city: "Quito", experienceYears: 3 };
    mockRepository.findById.mockResolvedValue(candidate);

    const result = await service.getById(1);
    expect(result).toEqual(candidate);
  });

  it("debería lanzar NotFoundError si el candidato no existe al buscar por id", async () => {
    mockRepository.findById.mockResolvedValue(null);

    await expect(service.getById(99)).rejects.toThrow(NotFoundError);
  });

  it("debería crear un candidato válido", async () => {
    const input = { name: "Ana Gómez", email: "ana@example.com", city: "Guayaquil", experienceYears: 2 };
    const saved = { id: 1, ...input };
    mockRepository.save.mockResolvedValue(saved);

    const result = await service.create(input);
    expect(result).toEqual(saved);
  });

  it("debería actualizar un candidato existente", async () => {
    const existing = { id: 1, name: "Ana", email: "ana@example.com", city: "Guayaquil", experienceYears: 2 };
    const input = { name: "Ana María", email: "ana@example.com", city: "Guayaquil", experienceYears: 4 };
    const updated = { id: 1, ...input };

    mockRepository.findById.mockResolvedValue(existing);
    mockRepository.update.mockResolvedValue(updated);

    const result = await service.update(1, input);
    expect(result).toEqual(updated);
  });

  it("debería eliminar un candidato existente", async () => {
    const existing = { id: 1, name: "Ana", email: "ana@example.com", city: "Guayaquil", experienceYears: 2 };
    mockRepository.findById.mockResolvedValue(existing);
    mockRepository.remove.mockResolvedValue(true);

    await expect(service.remove(1)).resolves.toBeUndefined();
    expect(mockRepository.remove).toHaveBeenCalledWith(1);
  });
});