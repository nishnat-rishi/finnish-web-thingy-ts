import patients from '../../data/patients'
import { PatientDisplayData } from '../types'

const getAll = (): PatientDisplayData[] => {
  return patients.map(({
    id, name, dateOfBirth, gender, occupation
  }) => {
    return {
      id, name, dateOfBirth, gender, occupation
    }
  }
  )
}

const patientsService = {
  getAll
}

export default patientsService