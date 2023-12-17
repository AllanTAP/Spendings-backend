import { DynamoDBDocumentClient, UpdateCommand } from '@aws-sdk/lib-dynamodb'

import { client } from './client.js'

const docClient = DynamoDBDocumentClient.from(client)

const tableName = process.env.TABLE_NAME
const id = process.env.TABLE_ITEM_ID

export async function insertEntry(valuesJson) {
  const command = new UpdateCommand({
    TableName: tableName,
    Key: { id },
    UpdateExpression: 'SET #entry = list_append(#entry, :newObj)',
    ExpressionAttributeNames: {
      '#entry': 'entries',
    },
    ExpressionAttributeValues: {
      ':newObj': [valuesJson],
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

export async function removeEntry(entryIndex) {
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
