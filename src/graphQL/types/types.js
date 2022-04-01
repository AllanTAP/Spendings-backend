const { gql } = require('apollo-server-express')

module.exports = gql`
  type Users {
    user_id: Int! # serial primary key,
    username: String # varchar(200) not null,
    password: String! # varchar(200) not null,
    email: String! # varchar(200) unique not null,
    create_on: String # timestamp not null,
    last_login: String # timestamp
  }

  type Entries {
    entry_id: Int!
    date: String,
    type: Int,
    createdAt: String,
    value: Float,
    description: String
  }

  type Query {
    hello: String,
    getEntries: [Entries]
  }

  type Mutation {
    setEntry: Boolean
  }
`
