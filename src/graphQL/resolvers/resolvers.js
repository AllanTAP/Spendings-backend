// const queries = require('./queries')
// const mutations = require('./mutations')

module.exports = {
  ...require('./User/UserResolver'),
  ...require('./Test/TestResolver'),
  ...require('./Entry/EntryResolver')
  // Query: {
  //   hello: () => 'Hello world!',
  // },
  // Mutatition: mutations
}