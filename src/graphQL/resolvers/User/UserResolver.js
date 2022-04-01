// import User from './../../types/types'

module.exports = {
  // Query: {
  //   getUser: (email) => User
  // },
  Mutation: {
    registerUser: ({ email, name, lastName, password }) => {
      console.log('email ->', email)
      console.log('name ->', name)
      console.log('lastName ->', lastName)
    }
  }
}
