import js from '@eslint/js';
import reactHooks from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist', 'node_modules', 'public/sw.js'] },
  js.configs.recommended,
  /*
   * As regras com tipo valem só para o TypeScript.
   *
   * Os arquivos `.js` e `.mjs` deste projeto — a própria configuração do
   * ESLint e os scripts de build — não estão no programa do TypeScript, e
   * pedir tipagem para eles só produz erro de carregamento de regra.
   */
  ...tseslint.configs.strictTypeChecked.map((config) => ({
    ...config,
    files: ['**/*.{ts,tsx}'],
  })),
  {
    /* Os scripts de build rodam no Node, não no navegador. */
    files: ['scripts/**/*.mjs', 'eslint.config.js', 'vite.config.ts'],
    languageOptions: {
      globals: { Buffer: 'readonly', console: 'readonly', process: 'readonly' },
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: { projectService: true, tsconfigRootDir: import.meta.dirname },
    },
    plugins: { 'react-hooks': reactHooks },
    rules: {
      ...reactHooks.configs.recommended.rules,
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/restrict-template-expressions': ['error', { allowNumber: true }],
    },
  },
  {
    /*
     * A camada Phaser conversa com uma API que devolve `any` em vários pontos.
     * Em vez de espalhar `eslint-disable` por ela, a fronteira é declarada aqui.
     */
    files: ['src/fase/**/*.ts'],
    rules: {
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
    },
  },
);
