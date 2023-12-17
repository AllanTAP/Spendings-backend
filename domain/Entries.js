import { v4 as uuidv4 } from 'uuid'

import { insertEntry, removeEntry } from '../aws/entryCrud.js'
import { listItens } from '../aws/generalCrud.js'

export async function getEntries() {
  const list = await listItens()

  if (list?.Item) return list.Item
  return null
}

export async function setEntry(_, { type, value, description, date }) {
  const data = {
    id: uuidv4(),
    spendType: type,
    value,
    description,
    date,
    createdAt: new Date().toISOString(),
  }

  const newEntry = await insertEntry(data)

  return newEntry.$metadata.httpStatusCode === 200
}

export async function deleteEntry(_, { entryIndex }) {
  const deletion = await removeEntry(entryIndex)

  return deletion.$metadata.httpStatusCode === 200
}
