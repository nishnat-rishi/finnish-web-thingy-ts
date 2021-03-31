import express from 'express'
import diagnosesService from '../services/diagnosesService'

const diagnosesRouter = express.Router()

diagnosesRouter.get('/', (req, res) => {
  res.send(diagnosesService.getAll())
})

export default diagnosesRouter