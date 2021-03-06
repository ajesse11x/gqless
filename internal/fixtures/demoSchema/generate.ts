import * as path from 'path'
import { generateSchema } from '@gqless/cli'
import { fetchQuery } from './fetchQuery'

generateSchema(fetchQuery, {
  typescript: true,
  outputDir: path.resolve(__dirname, './graphql'),
})
