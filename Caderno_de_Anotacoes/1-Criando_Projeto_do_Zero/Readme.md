# Criando projeto do zero

Na introdução ao React, vimos como configurar um webpack e babel. Porém foi
criado um comando onde já executa tudo isso, sem nos preocuparmos mais com css,
imagens, etc.

`yarn create react-app <nome_do_app>`

## package.json

Vou configurar o eslint do zero.

```diff
"scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
-  "eslintConfig": {
-    "extends": "react-app"
-  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
```

## public/index.html

Vou tirar a tag `link manifest` pois só é usado para
`Progressive Web App (PWA)`.

> PWAs são apps moldados para funcionarem como apps a partir do browser do
> celular. Podem acessar recursos nativos como câmera, geolocalização, etc. São
> muito úteis para android, porém iOS passa perrengue por falta de permissões no
> Safari.

```diff
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />

-    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />

    <title>React App</title>
```

## Delete arquivos que não serão usados neste app

Serão deletados:

- /public/manifest.json
  - Só serve se a app for PWA
- /public/logo192.png
- /public/logo512.png
- /src/App.css
- /src/App.test.js
- /src/index.css
- /src/logo.svg
- /src/serviceWorker.js
  - Só serve se a app for PWA
- /src/setupTests.js

## src/index.js

```diff
import React from 'react';
import ReactDOM from 'react-dom';
-import './index.css';
import App from './App';
-import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

-// If you want your app to work offline and load faster, you can change
-// unregister() to register() below. Note this comes with some pitfalls.
-// Learn more about service workers: https://bit.ly/CRA-PWA
-serviceWorker.unregister();
```

## src/App.js

```diff
import React from 'react';
-import logo from './logo.svg';
-import './App.css';

function App() {
  return (
    <div className="App">
-      <header className="App-header">
-        <img src={logo} className="App-logo" alt="logo" />
-        <p>
-          Edit <code>src/App.js</code> and save to reload.
-        </p>
-        <a
-          className="App-link"
-          href="https://reactjs.org"
-          target="_blank"
-          rel="noopener noreferrer"
-        >
-          Learn React
-        </a>
-      </header>
+     <h1>Hello World</h1>
    </div>
  );
}

export default App;
```
