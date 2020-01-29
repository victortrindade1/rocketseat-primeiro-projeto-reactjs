# Roteamento no React

O React tem como premissa nunca recarregar no browser. Ele é um single-page, mas
nem por isso não podemos navegar entre páginas. Para isto, usamos o router.

`yarn add react-router-dom`

## src/pages/Main/index.js

> Se digitar `rfc` cria o snippet

```javascript
import React from 'react';

// import { Container } from './styles';

export default function Main() {
  return <h1>Main</h1>;
}
```

## src/pages/Repository/index.js

```javascript
import React from 'react';

// import { Container } from './styles';

export default function Repository() {
  return <h1>Repository</h1>;
}
```

## src/routes.js

```javascript
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from './pages/Main';
import Repository from './pages/Repository';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/repository" component={Repository} />
      </Switch>
    </BrowserRouter>
  );
}
```

> O `exact` serve para q o roteamento seja feito se for digitado exatamente
> aquilo na url.

## src/App.js

```javascript
import React from 'react';

import Routes from './routes';

function App() {
  return <Routes />;
}

export default App;
```
