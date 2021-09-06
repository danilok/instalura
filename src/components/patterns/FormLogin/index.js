/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Button from '../../commons/Button';
import TextField from '../../forms/TextField';

export default function FormLogin() {
  const [loginInfo, setLoginInfo] = React.useState({
    usuario: '',
    senha: '',
  });

  function handleChange(event) {
    const fieldName = event.target.getAttribute('name');
    setLoginInfo({
      ...loginInfo,
      [fieldName]: event.target.value,
    });
  }

  return (
    <form id="formCadastro" action="/app/profile">
      <TextField
        placeholder="Usuário"
        name="usuario"
        value={loginInfo.usuario}
        onChange={handleChange}
      />
      <TextField
        placeholder="Senha"
        name="senha"
        type="password"
        value={loginInfo.senha}
        onChange={handleChange}
      />

      <Button
        type="submit"
        variant="primary.main"
        margin={{
          xs: '0 auto',
          md: 'initial',
        }}
        fullWidth
      >
        Entrar
      </Button>
    </form>
  );
}
