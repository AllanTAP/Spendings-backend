import { DynamoDBDocumentClient, GetCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb'

import { client } from './client.js'

const docClient = DynamoDBDocumentClient.from(client)

const tableName = process.env.TABLE_NAME
const id = process.env.TABLE_ITEM_ID

export async function getCurrency() {
  const command = new GetCommand({
    TableName: tableName,
    Key: { id },
  })

  const response = await docClient.send(command)

  return response
}

export async function setCurrency(code) {
  const command = new UpdateCommand({
    TableName: tableName,
    Key: { id },
    UpdateExpression: 'SET #currency = :newCode',
    ExpressionAttributeNames: {
      '#currency': 'currency',
    },
    ExpressionAttributeValues: {
      ':newCode': code,
    },
    ReturnValues: 'ALL_NEW',
  })

  const response = await docClient.send(command)

  return response
}
