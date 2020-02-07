# Exibindo o repositório

## src/pages/Main/styles.js

Vou aproveitar o styled component `<Container>` (uma caixa branca com borda
arredondada). Para isso, vou transformá-lo num componente separado do Main.

```diff
import styled, { keyframes, css } from 'styled-components';

- export const Container = styled.div`
-   max-width: 700px;
-   background: #fff;
-   border-radius: 4px;
-   box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
-   padding: 30px;
-   margin: 80px auto;
-
-   h1 {
-     font-size: 20px;
-     display: flex;
-     flex-direction: row;
-     align-items: center;
-
-     svg {
-       margin-right: 10px;
-     }
-   }
- `;

export const Form = styled.form`
  margin-top: 30px;
  display: flex;
  flex-direction: row;
```

## src/components/Container/index.js

```javascript
import styled from 'styled-components';

const Container = styled.div`
  max-width: 700px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  padding: 30px;
  margin: 80px auto;

  h1 {
    font-size: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;

    svg {
      margin-right: 10px;
    }
  }
`;

export default Container;
```

## src/pages/Main/index.js

```diff
- import { Container, Form, SubmitButton, List } from './styles';
+ import { Form, SubmitButton, List } from './styles';
+ import Container from '../../components/Container';
```

## src/pages/Repository/index.js

```diff
+ import { Link } from 'react-router-dom';
+ import { Loading } from './styles';

  render() {
    const { repository, issues, loading } = this.state;

+    if (loading) {
+      return <Loading>Carregando</Loading>;
+    }

-    return <h1>Repository</h1>;
+    return (
+      <Container>
+        <Owner>
+          <Link to="/">Voltar aos repositórios</Link>
+          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
+          <h1>{repository.name}</h1>
+          <p>{repository.description}</p>
+        </Owner>
+      </Container>
+    );
  }
```

## src/pages/Repository/styles.js

```javascript
import styled from 'styled-components';

export const Loading = styled.div`
  color: #fff;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

// Não precisa ser um header, pode ser uma simples div, tanto faz...
export const Owner = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;

  /* O component Link na verdade é uma tag <a> */
  a {
    color: #7159c1;
    font-size: 16px;
    text-decoration: none;
  }

  img {
    width: 120px;
    border-radius: 50%;
    margin-top: 20px;
  }

  h1 {
    font-size: 24px;
    margin-top: 10px;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
    line-height: 1.4;
    text-align: center;
    max-width: 400px;
  }
`;
```
