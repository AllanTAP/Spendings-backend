const { gql } = require('apollo-server-express')

module.exports = gql`
  type Query {
    hello: String
  }

  type Users {
    user_id: Int! # serial primary key,
    username: String # varchar(200) not null,
    password: String! # varchar(200) not null,
    email: String! # varchar(200) unique not null,
    create_on: String # timestamp not null,
    last_login: String # timestamp
  }
`
