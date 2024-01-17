import { DynamoDBDocumentClient, GetCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb'

import { client } from './client.js'

const docClient = DynamoDBDocumentClient.from(client)

const tableName = process.env.TABLE_NAME
const id = process.env.TABLE_ITEM_ID

export async function insertPaymentType(name) {
  const command = new UpdateCommand({
    TableName: tableName,
    Key: { id },
    UpdateExpression: 'ADD paymentTypes :newEntry',
    ExpressionAttributeValues: {
      ':newEntry': new Set([name.trim()]),
    },
    ReturnValues: 'ALL_NEW',
  })

  try {
    const response = await docClient.send(command)

    return response
  } catch (error) {
    throw new Error('=(', error)
  }
}

export async function listPayments() {
  const command = new GetCommand({
    TableName: tableName,
    Key: {
      id: id,
    },
    ProjectionExpression: 'paymentTypes, paymentEntries',
  })

  const response = await docClient.send(command)

  console.log('\n\n **** Payment ****\n', response?.Item)

  return response
}

export async function insertPaymentEntry(valuesJson) {
  console.log('here', valuesJson)
  const command = new UpdateCommand({
    TableName: tableName,
    Key: { id },
    UpdateExpression:
      'SET #paymentEntry = list_append(if_not_exists(#paymentEntry, :empty_list), :newObj)',
    ExpressionAttributeNames: {
      '#paymentEntry': 'paymentEntries',
    },
    ExpressionAttributeValues: {
      ':newObj': [valuesJson],
      ':empty_list': [],
    },
    ReturnValues: 'ALL_NEW',
  })

  try {
    const response = await docClient.send(command)

    console.log('response ->', response)

    return response
  } catch (error) {
    console.log(error)
    throw new Error('=(', error)
  }
}

export async function removePaymentEntry(entryIndex) {
  const command = new UpdateCommand({
    TableName: tableName,
    Key: { id },
    UpdateExpression: `REMOVE #paymentEntry[${entryIndex}]`,
    ExpressionAttributeNames: {
      '#paymentEntry': 'paymentEntries',
    },
    ReturnValues: 'UPDATED_NEW',
  })

  try {
    const response = await docClient.send(command)

    return response
  } catch (error) {
    throw new Error('=(', error)
  }
}
