import { GraphQLDefinitionsFactory } from '@nestjs/graphql';
import { join } from 'path';

const definitionsFactory = new GraphQLDefinitionsFactory();
definitionsFactory.generate({
   typePaths: ['./apps/games-api/**/*.graphql'],
   path: join(process.cwd(), 'apps/games-api/src/graphql.schema.ts'),
   outputAs: 'interface',
});
