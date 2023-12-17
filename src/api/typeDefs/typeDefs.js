import { loadFilesSync } from '@graphql-tools/load-files'

export default loadFilesSync([
  'src/api/typeDefs/*.graphql',
  'src/api/typeDefs/types/*.graphql',
])
