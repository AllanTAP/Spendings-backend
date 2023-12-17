import 'dotenv/config'

import { DynamoDBClient } from '@aws-sdk/client-dynamodb'

const credentials = {
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
}

const client = new DynamoDBClient({ region: 'eu-central-1', credentials })

export { client }
