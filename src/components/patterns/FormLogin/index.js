/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import * as yup from 'yup';
import errorAnimation from '../animations/error.json';
import loadingAnimation from '../animations/loading.json';
import Button from '../../commons/Button';
import TextField from '../../forms/TextField';
import useForm from '../../../infra/hooks/form/useForm';
import loginService from '../../../services/login/loginService';
import FormFeedbackAnimation from '../FormFeedbackAnimation';

const formStates = {
  DEFAULT: 'DEFAULT',
  LOADING: 'LOADING',
  DONE: 'DONE',
  ERROR: 'ERROR',
};

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
  const [submissionStatus, setSubmissionStatus] = React.useState(formStates.DEFAULT);
  const router = useRouter();
  const initialValues = {
    usuario: '',
    senha: '',
    // usuario: 'omariosouto',
    // senha: 'senhasegura',
  };

  const form = useForm({
    initialValues,
    onSubmit: (values) => {
      form.setIsFormDisabled(true);
      setSubmissionStatus(formStates.LOADING);
      loginService.login({
        username: values.usuario,
        password: values.senha,
      })
        .then(() => {
          setSubmissionStatus(formStates.DONE);
          router.push('/app/profile');
        })
        .catch(() => {
          setSubmissionStatus(formStates.ERROR);
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
        disabled={formStates.LOADING === submissionStatus}
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
        disabled={formStates.LOADING === submissionStatus}
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

      {form.isFormSubmitted && submissionStatus === formStates.LOADING && (
        <FormFeedbackAnimation
          config={{ animationData: loadingAnimation, loop: true, autoplay: true }}
        />
      )}

      {form.isFormSubmitted && submissionStatus === formStates.ERROR && (
        <FormFeedbackAnimation
          config={{ animationData: errorAnimation, loop: false, autoplay: true }}
        />
      )}
    </form>
  );
}

FormLogin.propTypes = {
  onSubmit: PropTypes.func,
};

FormLogin.defaultProps = {
  onSubmit: null,
};
