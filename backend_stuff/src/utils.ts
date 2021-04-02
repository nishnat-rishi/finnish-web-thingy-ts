import { v1 as uuid } from 'uuid'
import { Gender, NewPatientData, Patient } from './types'

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String
}

const parseString = (text: unknown, fieldName: string): string => {
  if (!text || !isString(text)) {
    throw new Error(
      `Incorrect or missing field '${fieldName}': ${text}`
    )
  }
  return text
}

const isDate = (text: string): boolean => {
  return Boolean(Date.parse(text))
}

const parseDate = (text: unknown): string => {
  if (!text || !isString(text) || !isDate(text)) {
    throw new Error(
      `Incorrect or missing field 'date': ${text}`
    )
  }

  return text
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (gender: any): gender is Gender => {
  return Object.values(Gender).includes(gender)
}

const parseGender = (text: unknown): Gender => {
  if (!text || !isGender(text)) {
    throw new Error(
      `Incorrect or missing field 'gender': ${text}`
    )
  }

  return text
}

export const toNewPatient = (
  patientData: NewPatientData,
  oldId?: string,
): Patient => {
  const newPatient: Patient = {
    id: oldId ? oldId : uuid(),
    name: parseString(patientData.name, 'name'),
    dateOfBirth: parseDate(patientData.dateOfBirth),
    ssn: parseString(patientData.ssn, 'ssn'),
    gender: parseGender(patientData.gender),
    occupation: parseString(patientData.occupation, 'occupation')
  }

  return newPatient
}