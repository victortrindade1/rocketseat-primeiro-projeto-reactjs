import React, { Component } from 'react';
import api from '../../services/api';

// import { Container } from './styles';

export default class Repository extends Component {
  state = {
    repository: {},
    issues: [],
    // Loading pode já ser passado como true pois logo roda o componentDidMount
    loading: true,
  };

  // é assíncrono pois vai ter consulta request
  async componentDidMount() {
    const { match } = this.props;

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
