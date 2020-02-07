# Definindo Propotypes

`yarn add prop-types`

## src/pages/Repository/index.js

```diff
import React, { Component } from 'react';
+ import PropTypes from 'prop-types';
import api from '../../services/api';

export default class Repository extends Component {
  state = {
    repository: {},
    issues: [],
    loading: true,
  };

  async componentDidMount() {
    const { match } = this.props;

    const repoName = decodeURIComponent(match.params.repository);

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: 'open',
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

  render() {
    const { repository, issues, loading } = this.state;

    return <h1>Repository</h1>;
  }
}

+ /**
+  * São 3 props para serem definidas: match, params, repository.
+  * match é um objeto, portanto usa shape() e exige params, q é objeto, e exige
+  * repository, q é string.
+  */
+ Repository.propTypes = {
+   match: PropTypes.shape({
+     params: PropTypes.shape({
+       repository: PropTypes.string,
+     }),
+   }).isRequired,
+ };
```
