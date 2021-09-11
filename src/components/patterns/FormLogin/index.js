/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import * as yup from 'yup';
import Button from '../../commons/Button';
import TextField from '../../forms/TextField';
import useForm from '../../../infra/hooks/form/useForm';
import loginService from '../../../services/login/loginService';

const loginSchema = yup.object().shape({
  usuario: yup
    .string()
    .required('"Usuário" é obrigatório')
    .min(3, 'Preencha ao menos 3 caracteres'),
  senha: yup
    .string()
    .required('"Senha" é obrigatória')
    .min(8, 'Sua senha precisa ter ao menos 8 caracteres'),
});

export default function FormLogin({ onSubmit }) {
  const router = useRouter();
  const initialValues = {
    usuario: '',
    senha: '',
  };

  const form = useForm({
    initialValues,
    onSubmit: (values) => {
      form.setIsFormDisabled(true);
      loginService.login({
        username: values.usuario,
        password: values.senha,
      })
        .then(() => {
          router.push('/app/profile');
        })
        .catch((err) => {
          // desafio: mostrar na tela
          // eslint-disable-next-line no-console
          console.log('Error: ', err);
        })
        .finally(() => {
          form.setIsFormDisabled(false);
        });
    },
    validateSchema: async (values) => loginSchema.validate(values, { abortEarly: false }),
  });

  return (
    <form id="formCadastro" onSubmit={onSubmit || form.handleSubmit}>
      <TextField
        placeholder="Usuário"
        name="usuario"
        value={form.values.usuario}
        error={form.errors.usuario}
        isTouched={form.touchedFields.usuario}
        onChange={form.handleChange}
        onBlur={form.handleBlur}
      />
      <TextField
        placeholder="Senha"
        name="senha"
        type="password"
        value={form.values.senha}
        error={form.errors.senha}
        isTouched={form.touchedFields.senha}
        onChange={form.handleChange}
        onBlur={form.handleBlur}
      />

      <Button
        type="submit"
        variant="primary.main"
        margin={{
          xs: '0 auto',
          md: 'initial',
        }}
        fullWidth
        disabled={form.isFormDisabled}
      >
        Entrar
      </Button>
    </form>
  );
}

FormLogin.propTypes = {
  onSubmit: PropTypes.func,
};

FormLogin.defaultProps = {
  onSubmit: null,
};
