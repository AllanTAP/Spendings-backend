import { DynamoDBDocumentClient, GetCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb'

import { client } from './client.js'

const docClient = DynamoDBDocumentClient.from(client)

const tableName = process.env.TABLE_NAME
const id = process.env.TABLE_ITEM_ID

export async function insertSpendType(name) {
  const command = new UpdateCommand({
    TableName: tableName,
    Key: { id },
    UpdateExpression: 'ADD spendTypes :newEntry',
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

export async function listSpends() {
  const command = new GetCommand({
    TableName: tableName,
    Key: {
      id: id,
    },
    ProjectionExpression: 'spendTypes, entries',
  })

  const response = await docClient.send(command)

  return response
}

export async function insertSpendEntry(valuesJson) {
  const command = new UpdateCommand({
    TableName: tableName,
    Key: { id },
    UpdateExpression:
      'SET #entry = list_append(if_not_exists(#entry, :empty_list), :newObj)',
    ExpressionAttributeNames: {
      '#entry': 'entries',
    },
    ExpressionAttributeValues: {
      ':newObj': [valuesJson],
      ':empty_list': [],
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

export async function removeSpendEntry(entryIndex) {
  const command = new UpdateCommand({
    TableName: tableName,
    Key: { id },
    UpdateExpression: `REMOVE #entry[${entryIndex}]`,
    ExpressionAttributeNames: {
      '#entry': 'entries',
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
