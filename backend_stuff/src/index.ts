require('dotenv').config() //eslint-disable-line
import express from 'express'
import diagnosesRouter from './routes/diagnoses'
import patientsRouter from './routes/patients'

import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors())

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here')
  res.send('pong')
})

app.use('/api/patients', patientsRouter)
app.use('/api/diagnoses', diagnosesRouter)

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`)
})