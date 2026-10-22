import eslint from '@eslint/js';
import { defineConfig } from 'eslint/config';
import prettier from 'eslint-config-prettier/flat';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import tseslint from 'typescript-eslint';

export default defineConfig(
    // PASTA QUE O ESLINT DEVE IGNORAR \\
    { ignores: ['.git', 'node_modules'] },

    //REGRAS RECOMENDADAS  DO JAVASCRIPT \\
    eslint.configs.recommended,

    //REGRAS RECOMENDADAS DO TYPESCRIPT \\
    tseslint.configs.recommended,

    //REGRAS RECOMENDADAS DO PRETTIER \\
    prettier,

    //REGRAS RECOMENDADAS DO SIMPLE IMPORT SORT \\
    {
        plugins: {
            'simple-import-sort': simpleImportSort,
        },
        rules: {
            'simple-import-sort/imports': 'error',
            'simple-import-sort/exports': 'error',
        },
    },
    {
        rules: {
            // PREFIXO _ = "SEI QUE NÃO ESTOU USANDO É PROPOSITAL"
            '@typescript-eslint/no-unused-vars': [
                'error',
                { argsIgnorePattern: '^_' },
            ],
        },
    },
);
