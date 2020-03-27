# Filtro de estado

As issues terão um filtro na lista. São 3 botões, onde vc escolhe quais issues vc quer ver. Se são as abertas, as fechadas ou todas.

## src/pages/Repository/index.js

```diff
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../../services/api';

import Container from '../../components/Container';
- import { Loading, Owner, IssueList } from './styles';
+ import { Loading, Owner, IssueList, IssueFilter } from './styles';

export default class Repository extends Component {
  state = {
    repository: {},
    issues: [],
    // Loading pode já ser passado como true pois logo roda o componentDidMount
    loading: true,
+    filters: [
+      { state: 'all', label: 'Todas', active: true },
+      { state: 'open', label: 'Abertas', active: false },
+      { state: 'closed', label: 'Fechadas', active: false },
+    ],
+    filterIndex: 0,
  };

  // é assíncrono pois vai ter consulta request
  async componentDidMount() {
    const { match } = this.props;
+    const { filters } = this.state;

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
-          state: 'open',
+          state: filters.find(f => f.active).state,
          per_page: 20,
        },
      }),
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
    });
  }

+  loadIssues = async () => {
+    const { match } = this.props;
+    const { filters, filterIndex } = this.state;
+
+    const repoName = decodeURIComponent(match.params.repository);
+
+    const response = await api.get(`/repos/${repoName}/issues`, {
+      params: {
+        state: filters[filterIndex].state,
+        per_page: 5,
+      },
+    });
+
+    this.setState({ issues: response.data });
+  };
+
+  handleFilterClick = async filterIndex => {
+    await this.setState({ filterIndex });
+    this.loadIssues();
+  };

  render() {
-    const { repository, issues, loading } = this.state;
+    const { repository, issues, loading, filterIndex, filters } = this.state;

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
+          <IssueFilter active={filterIndex}>
+            {filters.map((filter, index) => (
+              <button
+                type="button"
+                key={filter.label}
+                onClick={() => this.handleFilterClick(index)}
+              >
+                {filter.label}
+              </button>
+            ))}
+          </IssueFilter>
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
+export const IssueFilter = styled.div`
+  display: flex;
+  justify-content: center;
+  padding-bottom: 15px;
+  button {
+    border-radius: 4px;
+    outline: 0;
+    border: 0;
+    padding: 8px;
+    margin: 0 0.25rem;
+    &:nth-child(${props => props.active + 1}) {
+      background: #576574;
+      color: white;
+    }
+  }
+`;
```
