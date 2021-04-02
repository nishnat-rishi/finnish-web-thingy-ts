import express from 'express'
import patientsService from '../services/patientsService'
import { toNewPatient } from '../utils'

const patientsRouter = express.Router()

patientsRouter.get('/', (req, res) => {
  res.send(patientsService.getAll())
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

export default patientsRouter