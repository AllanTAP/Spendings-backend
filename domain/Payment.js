import { v4 as uuidv4 } from 'uuid'

import {
  insertPaymentEntry,
  insertPaymentType,
  listPayments,
  removePaymentEntry,
} from '../aws/paymentCrud.js'

export async function setPaymentType(_, { name }) {
  const newEntry = await insertPaymentType(name)

  return newEntry.$metadata.httpStatusCode === 200
}

export async function getPaymentEntries() {
  const list = await listPayments()

  if (list?.Item) return list.Item
  return null
}

export async function setPaymentEntry(_, { type, value, description, date }) {
  const data = {
    id: uuidv4(),
    paymentType: type,
    value,
    description,
    date,
    createdAt: new Date().toISOString(),
  }

  const newEntry = await insertPaymentEntry(data)

  return newEntry.$metadata.httpStatusCode === 200
}

export async function deletePaymentEntry(_, { entryIndex }) {
  const deletion = await removePaymentEntry(entryIndex)

  return deletion.$metadata.httpStatusCode === 200
}
