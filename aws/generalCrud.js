import { DynamoDBDocumentClient, GetCommand } from '@aws-sdk/lib-dynamodb'

import { client } from './client.js'

const docClient = DynamoDBDocumentClient.from(client)

const tableName = process.env.TABLE_NAME
const id = process.env.TABLE_ITEM_ID

export async function listItens() {
  const command = new GetCommand({
    TableName: tableName,
    Key: {
      id: id,
    },
  })

  const response = await docClient.send(command)

  return response
}
