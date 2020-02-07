import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../../services/api';

import Container from '../../components/Container';
import { Loading, Owner } from './styles';

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
