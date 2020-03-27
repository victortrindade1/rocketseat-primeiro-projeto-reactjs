# Paginação

Adicione paginação nas issues listadas no detalhe do repositório. A API do Github lista no máximo 30 issues por página e você pode controlar o número da página atual por um parâmetro no endereço da requisição:

`https://api.github.com/repos/rocketseat/unform/issues?page=2`

Adicione apenas um botão de próxima página e página anterior. O botão de página anterior deve ficar desativado na primeira página.

## src/pages/Repository/index.js

```diff
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../../services/api';

import Container from '../../components/Container';
- import { Loading, Owner, IssueList, IssueFilter } from './styles';
+ import { Loading, Owner, IssueList, IssueFilter, PageActions } from './styles';

export default class Repository extends Component {
  state = {
    repository: {},
    issues: [],
    // Loading pode já ser passado como true pois logo roda o componentDidMount
    loading: true,
    filters: [
      { state: 'all', label: 'Todas', active: true },
      { state: 'open', label: 'Abertas', active: false },
      { state: 'closed', label: 'Fechadas', active: false },
    ],
    filterIndex: 0,
+    page: 1,
  };

  // é assíncrono pois vai ter consulta request
  async componentDidMount() {
    const { match } = this.props;
    const { filters } = this.state;

    const repoName = decodeURIComponent(match.params.repository);

    /**
     * Aqui poderia ser:
     * const repository = await api.get(`/repos/${repoName}`),
     * const issues = await api.get(`/repos/${repoName}/issues`),
     *
     * Mas a request issues só faria depois de concluir a request repository.
     * Com o Promise.all, eu consigo fazer as 2 requests ao mesmo tempo.
     */

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      // Eu poderia usar os params na url (`/repos/${repoName}/issues?state=open`)
      // Mas o axios permite passar params como objeto no segundo parâmetro do método get()
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: filters.find(f => f.active).state,
          per_page: 5,
        },
      }),
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
    });
  }

  loadIssues = async () => {
    const { match } = this.props;
-    const { filters, filterIndex } = this.state;
+    const { filters, filterIndex, page } = this.state;

    const repoName = decodeURIComponent(match.params.repository);

    const response = await api.get(`/repos/${repoName}/issues`, {
      params: {
        state: filters[filterIndex].state,
        per_page: 5,
+        page,
      },
    });

    this.setState({ issues: response.data });
  };

  handleFilterClick = async filterIndex => {
    await this.setState({ filterIndex });
    this.loadIssues();
  };

+  handlePage = async action => {
+    const { page } = this.state;
+    await this.setState({
+      page: action === 'back' ? page - 1 : page + 1,
+    });
+    this.loadIssues();
+  };

  render() {
-    const { repository, issues, loading, filterIndex, filters } = this.state;
+    const {
+      repository,
+      issues,
+      loading,
+      filterIndex,
+      filters,
+      page,
+    } = this.state;

    if (loading) {
      return <Loading>Carregando</Loading>;
    }

    return (
      <Container>
        <Owner>
          <Link to="/">Voltar aos repositórios</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>

        <IssueList>
          <IssueFilter active={filterIndex}>
            {filters.map((filter, index) => (
              <button
                type="button"
                key={filter.label}
                onClick={() => this.handleFilterClick(index)}
              >
                {filter.label}
              </button>
            ))}
          </IssueFilter>
          {issues.map(issue => (
            // É boa prática a key ser uma string
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                  {issue.labels.map(label => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
        </IssueList>
+        <PageActions>
+          <button
+            type="button"
+            disabled={page < 2}
+            onClick={() => this.handlePage('back')}
+          >
+            Anterior
+          </button>
+          <span>Página {page}</span>
+          <button type="button" onClick={() => this.handlePage('next')}>
+            Próximo
+          </button>
+        </PageActions>
      </Container>
    );
  }
}

/**
 * São 3 props para serem definidas: match, params, repository.
 * match é um objeto, portanto usa shape() e exige params, q é objeto, e exige
 * repository, q é string.
 */
Repository.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      repository: PropTypes.string,
    }),
  }).isRequired,
};
```

## src/pages/Repository/styles.js

```diff
+ export const PageActions = styled.div`
+   padding-top: 15px;
+   display: flex;
+   justify-content: space-between;
+   align-items: center;
+   font-size: 12px;
+   button {
+     transition: opacity 0.25s ease-out;
+     border-radius: 4px;
+     outline: 0;
+     border: 0;
+     padding: 8px;
+     &:disabled {
+       opacity: 0.35;
+       cursor: not-allowed;
+     }
+   }
+ `;
```
