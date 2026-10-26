// src/modules/candidates/domain/Candidate.ts
import { DomainError } from "../../../shared/DomainError";

export interface Candidate {
  id: number;
  name: string;
  email: string;
  city: string;
  experienceYears: number;
}

export type NewCandidate = Omit<Candidate, "id">;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const parseNewCandidate = (body: unknown): NewCandidate => {
  if (!body || typeof body !== "object") {
    throw new DomainError("Datos inválidos");
  }

  const { name, email, city, experienceYears } = body as Record<string, unknown>;

  if (!name || typeof name !== "string" || name.trim() === "" || !email || typeof email !== "string" || email.trim() === "") {
    throw new DomainError("El nombre y el correo son obligatorios");
  }

  if (!emailRegex.test(email)) {
    throw new DomainError("El correo no tiene un formato válido");
  }

  if (!city || typeof city !== "string" || city.trim() === "") {
    throw new DomainError("La ciudad es obligatoria");
  }

  if (typeof experienceYears !== "number" || experienceYears < 0) {
    throw new DomainError("Los años de experiencia deben ser un número igual o mayor que 0");
  }

  return {
    name: name.trim(),
    email: email.trim(),
    city: city.trim(),
    experienceYears,
  };
};