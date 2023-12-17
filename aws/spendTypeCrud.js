import { DynamoDBDocumentClient, UpdateCommand } from '@aws-sdk/lib-dynamodb'

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
