import express from 'express'
import patientsService from '../services/patientsService'

const patientsRouter = express.Router()

patientsRouter.get('/', (req, res) => {
  res.send(patientsService.getAll())
})

export default patientsRouter