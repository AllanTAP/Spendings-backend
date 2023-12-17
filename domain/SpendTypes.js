import { insertSpendType } from '../aws/spendTypeCrud.js'

export async function setSpendType(_, { name }) {
  const newEntry = await insertSpendType(name)

  return newEntry.$metadata.httpStatusCode === 200
}
