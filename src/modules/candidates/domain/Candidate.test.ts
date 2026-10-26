// src/modules/candidates/domain/Candidate.test.ts
import { parseNewCandidate } from "./Candidate";
import { DomainError } from "../../../shared/DomainError";

describe("Candidate Domain", () => {
  it("debería parsear un candidato válido", () => {
    const validData = {
      name: "María Gómez",
      email: "maria.gomez@example.com",
      city: "Guayaquil",
      experienceYears: 4,
    };
    const result = parseNewCandidate(validData);
    expect(result).toEqual(validData);
  });

  it("debería fallar si falta el nombre o el correo", () => {
    const invalidData = {
      name: "",
      email: "maria@example.com",
      city: "Guayaquil",
      experienceYears: 2,
    };
    expect(() => parseNewCandidate(invalidData)).toThrow(DomainError);
    expect(() => parseNewCandidate(invalidData)).toThrow("El nombre y el correo son obligatorios");
  });

  it("debería fallar si el formato del correo es inválido", () => {
    const invalidData = {
      name: "María Gómez",
      email: "correo-invalido",
      city: "Guayaquil",
      experienceYears: 2,
    };
    expect(() => parseNewCandidate(invalidData)).toThrow("El correo no tiene un formato válido");
  });

  it("debería fallar si falta la ciudad", () => {
    const invalidData = {
      name: "María Gómez",
      email: "maria@example.com",
      city: "",
      experienceYears: 2,
    };
    expect(() => parseNewCandidate(invalidData)).toThrow("La ciudad es obligatoria");
  });

  it("debería fallar si experienceYears es menor a 0", () => {
    const invalidData = {
      name: "María Gómez",
      email: "maria@example.com",
      city: "Guayaquil",
      experienceYears: -2,
    };
    expect(() => parseNewCandidate(invalidData)).toThrow("Los años de experiencia deben ser un número igual o mayor que 0");
  });
});