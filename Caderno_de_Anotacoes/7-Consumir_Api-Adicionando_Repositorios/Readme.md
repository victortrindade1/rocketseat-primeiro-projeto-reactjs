# Adicionando repositórios

## Axios

Aqui vamos consumir nossa primeira API. Vamos interagir com a API do Github.
Esta API fornece na response todos os dados de um repositório específico que vc
enviar pela request. Estes dados vamos salvar num state.

Poderiamos consultar com a função `fetch`, porém o axios é mais teta, pois
permite usar uma base_url e outras tetas, então usaremos a lib `axios` para
requests-responses.

`yarn add axios`

## src/services/api.js

Pegaremos como exemplo a api de repositórios do github nesta url:
`https://developer.github.com/v3/repos/#get`

Na documentação da API diz que podemos acessar com um GET nesta url:
`GET /repos/:owner/:repo`. Ou seja, se eu acessar
`https://api.github.com/repos/victortrindade1/rocketseat-primeiro-projeto-reactjs`,
aparece todo o JSON deste repositório.

Para facilitar e organizar, vamos criar a baseURL.

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.github.com',
});

export default api;
```

## src/pages/Main/index.js

Como eu estou fazendo uma request em uma api, pode ser q demore. Então, não
deixe de usar o `async await`. Uma coisa legal q faremos é criar um loading qnd
estiver no meio da requisição. Talvez seja uma boa prática fazer o loading em
toda async await...

```diff
import React from 'react';
- import { FaGithubAlt, FaPlus } from 'react-icons/fa';
+ import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';

+ import api from '../../services/api';

import { Container, Form, SubmitButton } from './styles';

- export default function Main() {
+ export default class Main extends Component {
+  state = {
+    newRepo: '',
+    repositories: [],
+    loading: false,
+  };
+
+  handleInputChange = e => {
+    this.setState({ newRepo: e.target.value });
+  };
+
+  handleSubmit = async e => {
+    e.preventDefault();
+
+    this.setState({ loading: true });
+
+    const { newRepo, repositories } = this.state;
+
+    const response = await api.get(`/repos/${newRepo}`);
+
+    const data = {
+      name: response.data.full_name,
+    };
+
+    this.setState({
+      repositories: [...repositories, data],
+      newRepo: '',
+      loading: false,
+    });
+  };
+
+  render() {
+    const { newRepo, loading } = this.state;

    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositórios
        </h1>

-        <Form onSubmit={() => {}}>
+        <Form onSubmit={this.handleSubmit}>
-          <input type="text" placeholder="Adicionar repositório" />
+          <input
+            type="text"
+            placeholder="Adicionar repositório"
+            value={newRepo}
+            onChange={this.handleInputChange}
+          />

-          <SubmitButton disabled>
-            <FaPlus color="#fff" size={14} />
+          <SubmitButton loading={loading}>
+            {loading ? (
+              <FaSpinner color="#fff" size={14} />
+            ) : (
+              <FaPlus color="#fff" size={14} />
+            )}
          </SubmitButton>
        </Form>
      </Container>
    );
}
```

## src/pages/Main/styles.js

```diff
- import styled from 'styled-components';
+ import styled, { keyframes, css } from 'styled-components';

export const Container = styled.div`
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

export const Form = styled.form`
  margin-top: 30px;
  display: flex;
  flex-direction: row;

  input {
    flex: 1; /* flex = 1 ocupa todo o espaço disponível */
    border: 1px solid #eee;
    padding: 10px 15px;
    border-radius: 4px;
    font-size: 16px;
  }
`;

+ // Toda animação do styled component precisa do ponto de partida até ponto de chegada
+ const rotate = keyframes`
+   from {
+     transform: rotate(0deg);
+   }
+
+   to {
+     transform: rotate(360deg);
+   }
+ `;

- export const SubmitButton = styled.button.attrs({
+ export const SubmitButton = styled.button.attrs(props => ({
  type: 'submit',
+ disabled: props.loading,
- })`
+ }))`
  background: #7159c1;
  border: 0;
  padding: 0 15px;
  margin-left: 10px;
  border-radius: 4px;

  display: flex;
  justify-content: center;
  align-items: center;

+  /*
+  Atributos criados ficam em []. Atributos prontos como focus, hover, ficam sem []
+  &:hover {
+    background: #fff;
+  }
+  */
+  &[disabled] {
+    cursor: not-allowed;
+    opacity: 0.6;
+  }
+
+  /* O if ternário sem else é &&. O if ternário com else é : */
+  /* O método do styled-components css foi necessário pois teve q escrever css
+  dentro de JS dentro do css do SubmitButton */
+  svg {
+    ${props =>
+      props.loading &&
+      css`
+        animation: ${rotate} 2s linear infinite;
+      `}
+  }
`;
```
