import patients from '../../data/patients'
import { Entry, Patient, PublicPatient } from '../types'

const getAllPublic = (): PublicPatient[] => {
  return patients.map(({
    id, name, dateOfBirth, gender, occupation
  }) => {
    return {
      id, name, dateOfBirth, gender, occupation
    }
  })
}

const get =  (id: string): Patient | undefined => {
  return patients.find(p => p.id === id)
}

const create = (patient: Patient): Patient => {
  patients.push(patient)
  return patient
}

const createEntry = (patientId: string, entry: Entry): Entry => {
  const index = patients.findIndex(p => p.id === patientId)
  patients[index].entries.push(entry)
  return entry
}

const patientsService = {
  getAllPublic,
  get,
  create,
  createEntry
}

export default patientsService