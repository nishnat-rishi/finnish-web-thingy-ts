import express from 'express'
import patientsService from '../services/patientsService'
import { toNewEntry, toNewPatient } from '../utils'

const patientsRouter = express.Router()

patientsRouter.get('/', (req, res) => {
  res.send(patientsService.getAllPublic())
})

patientsRouter.get('/:id', (req, res) => {
  const patient = patientsService.get(req.params.id)
  res.send(patient)
})

patientsRouter.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body)
    const savedPatient = patientsService.create(newPatient)
    res.status(201).send(savedPatient)
  } catch (e) {
    res.status(400).send(e.message)
  }
})

patientsRouter.post('/:id/entries', (req, res) => {
  try {
    const newEntry = toNewEntry(req.body)
    const savedEntry = patientsService.createEntry(
      req.params.id,
      newEntry
    )
    res.status(201).send(savedEntry)
  } catch (e) {
    res.status(400).send(e.message)
  }
})

export default patientsRouter