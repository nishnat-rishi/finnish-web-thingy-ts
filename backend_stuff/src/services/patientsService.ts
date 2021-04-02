import patients from '../../data/patients'
import { Patient, PatientDisplayData } from '../types'

const getAll = (): PatientDisplayData[] => {
  return patients.map(({
    id, name, dateOfBirth, gender, occupation
  }) => {
    return {
      id, name, dateOfBirth, gender, occupation
    }
  })
}

const create = (patient: Patient): Patient => {
  patients.push(patient)
  return patient
}

const patientsService = {
  getAll,
  create
}

export default patientsService