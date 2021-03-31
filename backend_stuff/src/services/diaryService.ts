/* eslint-disable @typescript-eslint/no-unsafe-call */
import diaries from '../../data/diaries'

import {
  DiaryEntry,
  NewDiaryEntry,
  NonSensitiveDiaryEntry
} from '../types'

const findById = (id: number): DiaryEntry | undefined => {
  const entry = diaries.find(d => d.id === id)
  return entry
}

const getEntries = (): Array<DiaryEntry> => {
  return diaries
}

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
  return diaries.map(({ id, date, weather, visibility }) => ({
    id,
    date,
    weather,
    visibility,
  }))
}

const addEntry = (entry: NewDiaryEntry): DiaryEntry => {
  const newDiaryEntry = {
    id: Math.max(...diaries.map(d => d.id)) + 1,
    ...entry
  }

  diaries.push(newDiaryEntry)
  return newDiaryEntry
}

export default {
  getEntries,
  getNonSensitiveEntries,
  addEntry,
  findById
}