// import Entry from './../../types/types'

module.exports = {
  Query: {
    getEntries: () => {
      console.log('entries')
    }
  },
  Mutation: {
    setEntry: ({ date, type, value, description }) => {
      console.log('date ->', date)
      console.log('type ->', type)
      console.log('value ->', value)
      console.log('description ->', description)
    } 
  }
}