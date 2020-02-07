# Navegação de rotas

O que faremos aqui será a navegação para a página "Repository" ao clicar no link
"Detalhes" da lista de repositórios.

## src/pages/Main/index.js

```diff
import React, { Component } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
+ import { Link } from 'react-router-dom';

...

        <List>
          {repositories.map(repository => (
            <li key={repository.name}>
              <span>{repository.name}</span>
-              <a href="">Detalhes</a>
+              {/*
+              OBS 1: Se simplesmente colocasse <Link to="/repository">Detalhes</Link>
+              já navegaria, mas além de navegar, quero q mostre o nome do
+              repositório na url.
+              OBS 2: O encodeURIComponent() transforma as barras "/" da url em
+              "%2F". É necessário essa transformação pq na real as barras são
+              pra dividir pastas. Qnd eu quiser aproveitar essa informação, vou
+              ter q usar um decodeURIComponent() para voltar para barra.
+              */}
+              <Link to={`/repository/${encodeURIComponent(repository.name)}`}>
+                Detalhes
+              </Link>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}
```

## src/routes.js

```diff
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from './pages/Main';
import Repository from './pages/Repository';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Main} />
-        <Route path="/repository" component={Repository} />
+        <Route path="/repository/:repository" component={Repository} />
      </Switch>
    </BrowserRouter>
  );
}
```

## src/pages/Repository/index.js

```diff
import React from 'react';

// import { Container } from './styles';

- export default function Repository() {
-   return <h1>Repository</h1>;
+ export default function Repository({ match }) {
+   return <h1>Repository: {decodeURIComponent(match.params.repository)}</h1>;
}
```
