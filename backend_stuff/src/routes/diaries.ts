import express from 'express'
import diaryService from '../services/diaryService'
import toNewDiaryEntry from '../utils'

const diaryRouter = express.Router()

diaryRouter.get('/', (req, res) => {
  const diary = diaryService.findById(Number(req.params.id))

  if (diary) {
    res.send(diary)
  } else {
    res.sendStatus(404)
  }

  res.send(diaryService.getNonSensitiveEntries())
})

diaryRouter.get('/:id', (req, res) => {
  res.send(diaryService.getNonSensitiveEntries())
})

diaryRouter.post('/', (req, res) => {
  try {
    const newDiaryEntry = toNewDiaryEntry(req.body)
    const addedEntry = diaryService.addEntry(newDiaryEntry)
    res.json(addedEntry)
  } catch (e) {
    res.status(400).send(e.message)
  }
})

export default diaryRouter