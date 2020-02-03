# Styled Components

O Styled Components não substitui o css. Vc vai continuar digitando css na unha,
porém agora dentro de um arquivo JS, e a forma como o código css é manipulado é
melhor, pois garante que será executado apenas naquele componente.

Algumas tags HTML passam a ser Components, e um `styles.js` possui o css. Nem
toda tag é transformada em component, somente as q forem containers. As outras
podem ser passadas da mesma forma como o SASS. Se vc não entendeu, veja a tag
<span> do exemplo a seguir.

`yarn add styled-components`

> Tenha a extensão no vscode `styled components`.

## Exemplo 1 - estilizando uma tag

No exemplo a seguir, estilizaremos uma tag `<h1>`.

### src/pages/Main/styles.js

```javascript
import styled from 'styled-components';

export const Title = styled.h1`
  font-size: 24px;
  color: #7159c1;
  font-family: Arial, Helvetica, sans-serif;

  span {
    color: #3e3e3e;
  }
`;
```

> Repare que o único lugar onde apareceu a tag HTML foi em `styled.h1`

### src/pages/Main/index.js

```diff
import React from 'react';

+ import { Title } from './styles';

export default function Main() {
-  return <h1>Main</h1>;
+  return (
+    <Title>Main <span>Teta</span></Title>
+  );
}
```

## Exemplo 2 - Condicional no styled components

Com o styled components, podemos criar JS a fundo dentro do CSS. Podemos criar
funções, acessar props do component, de tudo!

No exemplo a seguir passarei uma propriedade `error = {true}` no Component e
dependendo do que vier nessa prop mudará a cor.

### src/pages/Main/index.js

```diff
- <Title>
+ <Title error={true}>
    Main <span>Teta</span>
  </Title>
```

### src/pages/Main/styles.js

```diff
export const Title = styled.h1`
  font-size: 24px;
-  color: #7159c1;
+  color: ${props => (props.error ? 'red' : '#7159c1')};
```
