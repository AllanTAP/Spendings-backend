require('dotenv').config()

const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const cors = require('cors')

const database = require('./init/database')
const User = require('./Models/User')
// const initContext = require('./init/context')
const { typeDefs, resolvers } = require('./graphQL')

const corsOptions = {
  origin: '*',
  optionSuccessStatus: 200
}

const startProcess = async () => {
  try {
    await database.sync()
  } catch (error) {
    console.log(error)
  }

  // const resultadoCreate = await User.create({
  //   username: 'Allan Amaral',
  //   email: 'allan.depontes@gmail.com'
  //   // descricao: 'Um mouse USB bonitão'
  // })
  // console.log(resultadoCreate)

  const app = express()
  app.use(cors(corsOptions))

  app.get('/', (_req, res) => res.send('API working'))

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    // schema: await buildSchema({
    //   resolvers: [UserResolver]
    // })
  })

  await server.start()
  server.applyMiddleware({ app })

  app.listen(process.env.PORT, () => {
    console.log(`API running on port ${process.env.PORT}`)
  })

  return { app, server }
}

startProcess()
