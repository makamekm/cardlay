import { GraphQLDefinitionsFactory } from '@nestjs/graphql';
import { join } from 'path';

const definitionsFactory = new GraphQLDefinitionsFactory();
definitionsFactory.generate({
  typePaths: ['./api/**/*.graphql'],
  path: join(process.cwd(), 'api/shared/graphql.ts'),
  outputAs: 'interface',
  watch: true,
});
