import js from '@eslint/js';
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier';

const config = [
  { ignores: ['.next/**', 'node_modules/**', 'out/**', 'build/**'] },
  js.configs.recommended,
  ...nextCoreWebVitals,
  ...nextTypescript,
  prettier,
  {
    rules: {
      'no-console': 'error',
      'import/no-named-as-default': 'off',
      'import/no-named-as-default-member': 'off',
      'react/self-closing-comp': ['error', { component: true, html: true }],
      'react/jsx-pascal-case': ['error'],
      'react/jsx-no-useless-fragment': ['error', { allowExpressions: true }],
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          pathGroups: [{ pattern: 'react', group: 'external', position: 'before' }],
          pathGroupsExcludedImportTypes: ['react'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
    },
  },
];

export default config;
