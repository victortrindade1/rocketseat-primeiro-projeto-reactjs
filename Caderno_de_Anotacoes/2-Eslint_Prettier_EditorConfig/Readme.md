# Eslint, Prettier e EditorConfig

## EditorConfig

Tenha a extensão instalada no vscode. Com o botão auxiliar do mouse na pasta
root, clique em `Generate .editorconfig`.

### .editorconfig

```diff
root = true

[*]
+ end_of_line = lf
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
- trim_trailing_whitespace = false
- insert_final_newline = false
+ trim_trailing_whitespace = true
+ insert_final_newline = true
```

> `end_of_line = lf` é para o final da linha ser no padrão Unix, e não no padrão
> Windows.

## Eslint e Prettier

Fonte: https://www.notion.so/Padr-es-de-projeto-com-ESLint-Prettier-e-EditorConfig-0b57b47a24724c859c0cf226aa0cc3a7

`yarn add eslint@6.8.0 -D`

> Acima desta versão dá erro

Inicie o eslint: `yarn eslint --init`

Responda:
R1 - To check syntax, find problems, and enforce code style
R2 - JavaScript modules (import/export)
R3 - React
R4 - Não usa TypeScript
R5 - Browser
R6 - Use a popular style guide
R7 - Airbnb: https://github.com/airbnb/javascript
R8 - JavaScript
R9 - Confirma com Y

O Eslint é instalado pelo `npm`, e daí ele gera o arquivo `package-lock.json`.
Delete o arquivo, pois uso o yarn. Atualize o yarn com o comando `yarn`.

Instale estas tetas:

`yarn add prettier eslint-config-prettier eslint-plugin-prettier babel-eslint -D`

## .eslintrc.js (Jeito 1)

```diff
module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
+    'airbnb/base',
+    'eslint-config-prettier',
+    'airbnb',
+    'prettier',
+    'prettier/react',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
+  parser: "babel-eslint",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
-  plugins: [
-    'react',
-  ],
+  plugins: ['react', 'eslint-plugin-prettier'],
  rules: {
+    "prettier/prettier": "error",
+    "react/jsx-filename-extension": ["warn", { extensions: [".jsx", ".js"] }],
+    "import/prefer-default-export": "off",
+    'react/state-in-constructor': ['off', 'always'],
  },
};
```

O curso ao final disponibiliza umas `rules` bem mais completas. Use as debaixo:

```diff
  rules: {
+    'prettier/prettier': 'error',
+    'react/jsx-filename-extension': ['warn', { extensions: ['.jsx', '.js'] }],
+    'import/prefer-default-export': 'off',
+    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
+    'react/jsx-one-expression-per-line': 'off',
+    'global-require': 'off',
+    'react-native/no-raw-text': 'off',
+    'no-param-reassign': 'off',
+    'no-underscore-dangle': 'off',
+    camelcase: 'off',
+    'react/state-in-constructor': ['off', 'always'],
+    'no-console': ['error', { allow: ['tron'] }],
+    'react-hooks/rules-of-hooks': 'error',
+    'react-hooks/exhaustive-deps': 'warn',
  }
```

## .eslintrc.js (Jeito 2)

Esse jeito foi o sugerido pelo professor no final do curso. Tem umas coisas
diferentes. Confesso q não sei qual o melhor.

```javascript
module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  extends: ['airbnb', 'prettier', 'prettier/react'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    __DEV__: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', 'jsx-a11y', 'import', 'react-hooks', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    'react/jsx-filename-extension': ['warn', { extensions: ['.jsx', '.js'] }],
    'import/prefer-default-export': 'off',
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'react/jsx-one-expression-per-line': 'off',
    'global-require': 'off',
    'react-native/no-raw-text': 'off',
    'no-param-reassign': 'off',
    'no-underscore-dangle': 'off',
    camelcase: 'off',
    'react/state-in-constructor': ['off', 'always'],
    'no-console': ['error', { allow: ['tron'] }],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
};
```

## .prettierrc

Crie o arquivo `.prettierrc` no root.

```javascript
{
  "singleQuote": true,
  "trailingComma": "es5"
}
```

> O prettier começou a dar um bug junto com o .editorconfig. As aspas simples se tornam aspas duplas e o eslint reclama. Pra resolver isto, vai nas Settings do VSCode -> Prettier -> Single Quotes in JSX
