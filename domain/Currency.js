import { getCurrency, setCurrency } from '../aws/currencyCrud.js'

export async function getUserCurrency() {
  const response = await getCurrency()

  if (response?.Item) return response.Item?.currency
  return null
}

export async function setUserCurrency(_, { code }) {
  const newCurrency = await setCurrency(code)

  return newCurrency.$metadata.httpStatusCode === 200
}
