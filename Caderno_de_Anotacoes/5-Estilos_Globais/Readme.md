# Estilos Globais

Aqui vem estilos comuns a toda a DOM.

## src/styles/global.js

```javascript
import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    min-height: 100%;
  }

  body {
    background: #7159c1;
    -webkit-font-smoothing: antialiased !important;
  }

  body, input, button {
    color: #222;
    font-size: 14px;
    font-family: Arial, Helvetica, sans-serif;
  }

  button {
    cursor: pointer;
  }
`;
```

## src/App.js

```diff
import React from 'react';

import Routes from './routes';
+ import GlobalStyle from './styles/global';

function App() {
-  return <Routes />;
+  return (
+    <>
+      <Routes />
+      <GlobalStyle />
+    </>
+  );
}

export default App;
```

## Daqui pra baixo é desnecessário

### src/pages/Main/styles.js

```diff
import styled from 'styled-components';

export const Title = styled.h1`
-  font-size: 24px;
-  color: ${props => (props.error ? 'red' : '#7159c1')};
-  font-family: Arial, Helvetica, sans-serif;
-
-  span {
-    color: #3e3;
-  }
+ color: #fff;
`;
```

### src/pages/Main/index.js

```diff
  return (
-    <Title error>
-      Main <span>Teta</span>
-    </Title>
+  return <Title>Hello World</Title>;
  );
```
