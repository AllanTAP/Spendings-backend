import 'dotenv/config'

import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'

import { resolvers, typeDefs } from './api/index.js'

async function main() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
  })

  const { url } = await startStandaloneServer(server, {
    listen: {
      port: process.env.PORT,
    },
  })

  console.log(`\n\nRunning at: ${url}`)
}

main()
