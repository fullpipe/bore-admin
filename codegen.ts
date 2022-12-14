import type {CodegenConfig} from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://localhost:8080/query',
  documents: 'src/**/*.graphql',

  generates: {
    'src/generated/graphql.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-apollo-angular',
      ],
    },
  },
  config: {
    addExplicitOverride: true,
    scalars: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Uint: 'number',
      // eslint-disable-next-line @typescript-eslint/naming-convention
      ID: 'number',
    },
  },
};

export default config;
