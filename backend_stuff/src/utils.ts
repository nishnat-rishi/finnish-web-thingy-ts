import { v1 as uuid } from 'uuid'
import {
  Gender,
  NewPatientData,
  Patient,
  EntryWithoutId,
  Entry,
  Diagnosis,
  HealthCheckRating
} from './types'

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  )
}

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
    occupation: parseString(patientData.occupation, 'occupation'),
    entries: []
  }

  return newPatient
}

const parseDiagnosisCodes = (codes: unknown[]):
 Array<Diagnosis['code']> => {
  return codes.map(code =>
    parseString(code, 'Diagnosis[\'code\']')
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (healthCheckRating: any):
healthCheckRating is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(healthCheckRating)
}

const parseHealthCheckRating = (healthCheckRating: unknown):
HealthCheckRating => {
  if (!healthCheckRating || !isHealthCheckRating(Number(healthCheckRating))) {
    throw new Error(
      `Incorrect or missing field 'healthCheckRating':
       ${healthCheckRating}`
    )
  }

  return Number(healthCheckRating)
}

export const toNewEntry = (entryData: EntryWithoutId): Entry => {
  const baseEntry = {
    id: uuid(),
    description: parseString(entryData.description, 'description'),
    date: parseDate(entryData.date),
    specialist: parseString(entryData.specialist, 'specialist'),
    diagnosisCodes: entryData.diagnosisCodes
      ? parseDiagnosisCodes(entryData.diagnosisCodes)
      : undefined,
  }

  let newEntry
  switch(entryData.type) {
    case 'HealthCheck':
      newEntry = {
        ...baseEntry,
        type: 'HealthCheck',
        healthCheckRating: parseHealthCheckRating(
          entryData.healthCheckRating
        )
      }
      break
    case 'Hospital':
      newEntry = {
        ...baseEntry,
        type: 'Hospital',
        discharge: {
          criteria: parseString(
            entryData.discharge.criteria, 'discharge.criteria'
          ),
          date: parseDate(entryData.discharge.date)
        }
      }
      break
    case 'OccupationalHealthcare':
      newEntry = {
        ...baseEntry,
        type: 'OccupationalHealthcare',
        employerName: parseString(
          entryData.employerName, 'employerName'
        ),
        sickLeave: entryData.sickLeave
          ? {
            startDate: parseDate(entryData.sickLeave.startDate),
            endDate: parseDate(entryData.sickLeave.endDate)
          }
          : undefined
      }
      break
    default:
      assertNever(entryData)
  }
  return newEntry as Entry
}