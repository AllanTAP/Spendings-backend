import { v4 as uuidv4 } from 'uuid'

import {
  insertSpendEntry,
  insertSpendType,
  listSpends,
  removeSpendEntry,
} from '../aws/entryCrud.js'

export async function setSpendType(_, { name }) {
  const newEntry = await insertSpendType(name)

  return newEntry.$metadata.httpStatusCode === 200
}

export async function getSpendEntries() {
  const list = await listSpends()

  if (list?.Item) return list.Item
  return null
}

export async function setSpendEntry(_, { type, value, description, date }) {
  const data = {
    id: uuidv4(),
    spendType: type,
    value,
    description,
    date,
    createdAt: new Date().toISOString(),
  }

  const newEntry = await insertSpendEntry(data)

  return newEntry.$metadata.httpStatusCode === 200
}

export async function deleteSpendEntry(_, { entryIndex }) {
  const deletion = await removeSpendEntry(entryIndex)

  return deletion.$metadata.httpStatusCode === 200
}
