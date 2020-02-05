import styled, { keyframes, css } from 'styled-components';

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

// Toda animação do styled component precisa do ponto de partida até ponto de chegada
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const SubmitButton = styled.button.attrs(props => ({
  type: 'submit',
  disabled: props.loading,
}))`
  background: #7159c1;
  border: 0;
  padding: 0 15px;
  margin-left: 10px;
  border-radius: 4px;

  display: flex;
  justify-content: center;
  align-items: center;

  /*
  Atributos criados ficam em []. Atributos prontos como focus, hover, ficam sem []
  &:hover {
    background: #fff;
  }
  */
  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }

  /* O if ternário sem else é &&. O if ternário com else é : */
  /* O método do styled-components css foi necessário pois teve q escrever css
  dentro de JS dentro do css do SubmitButton */
  svg {
    ${props =>
      props.loading &&
      css`
        animation: ${rotate} 2s linear infinite;
      `}
  }
`;

export const List = styled.ul`
  list-style: none;
  margin-top: 30px;

  li {
    padding: 15px 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    /* Estiliza todas as linhas, menos a primeira */
    & + li {
      border-top: 1px solid #eee;
    }

    a {
      color: #7159c1;
      text-decoration: none;
    }
  }
`;
