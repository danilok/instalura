import React from 'react';
import PropTypes from 'prop-types';
import successAnimation from '../animations/success.json';
import errorAnimation from '../animations/error.json';
import loadingAnimation from '../animations/loading.json';
import Button from '../../commons/Button';
import TextField from '../../forms/TextField';
import Box from '../../foundation/layout/Box';
import Grid from '../../foundation/layout/Grid';
import Text from '../../foundation/Text';
import CloseButton from '../../commons/CloseButton';
import FormFeedbackAnimation from '../FormFeedbackAnimation';

const formStates = {
  DEFAULT: 'DEFAULT',
  LOADING: 'LOADING',
  DONE: 'DONE',
  ERROR: 'ERROR',
};

const messagesMap = {
  success: 'Cadastro realizado com sucesso!',
  loading: 'Validando cadastro...',
  error: {
    unique: 'Usuário informado já cadastrado!',
    generic: 'Não foi possível cadastrar o usuário agora :(',
  },
};

function FormContent() {
  const [isFormSubmitted, setIsFormSubmitted] = React.useState(false);
  const [submissionStatus, setSubmissionStatus] = React.useState(formStates.DEFAULT);
  const [message, setMessage] = React.useState('');
  const [userInfo, setUserInfo] = React.useState({
    usuario: '',
    nome: '',
    // usuario: 'danilo@email.com',
    // nome: 'danilo',
  });

  function handleChange(event) {
    const fieldName = event.target.getAttribute('name');
    setUserInfo({
      ...userInfo,
      [fieldName]: event.target.value,
    });
  }

  const isFormValid = userInfo.nome.length === 0 || userInfo.usuario.length === 0;

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();

        setIsFormSubmitted(true);

        // Data Transfer Object
        const userDTO = {
          username: userInfo.usuario,
          name: userInfo.nome,
        };

        try {
          setMessage(messagesMap.loading);
          setSubmissionStatus(formStates.LOADING);
          const respostaDoServidor = await fetch('https://instalura-api.vercel.app/api/users', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(userDTO),
          });

          if (!respostaDoServidor.ok) {
            const respostaConvertidaDoErro = await respostaDoServidor.json();
            const mensagem = messagesMap.error[respostaConvertidaDoErro.error.username.kind];
            if (mensagem) {
              throw new Error(mensagem);
            }
            throw new Error(messagesMap.error.generic);
          }

          // const respostaConvertidaEmObjeto = await respostaDoServidor.json();
          setTimeout(() => {
            setMessage(messagesMap.success);
            setSubmissionStatus(formStates.DONE);
          }, 1000);
        } catch (error) {
          setTimeout(() => {
            setMessage(error.message);
            setSubmissionStatus(formStates.ERROR);
          }, 1000);
        }
      }}
    >
      <Text
        variant="title"
        tag="h1"
        color="tertiary.main"
      >
        Pronto para saber da vida dos outros?
      </Text>

      <Text
        variant="paragraph1"
        tag="p"
        color="tertiary.light"
        marginBottom="32px"
      >
        Você está a um passo de saber tudo o que está rolando
        no bairro, complete seu cadastro agora!
      </Text>
      <div>
        <TextField
          placeholder="Usuário"
          name="usuario"
          value={userInfo.usuario}
          onChange={handleChange}
        />
      </div>
      <div>
        <TextField
          placeholder="Nome"
          name="nome"
          value={userInfo.nome}
          onChange={handleChange}
        />
      </div>
      <Button
        variant="primary.main"
        type="submit"
        disabled={isFormValid}
        fullWidth
      >
        Cadastrar
      </Button>

      {isFormSubmitted && submissionStatus === formStates.LOADING && (
        <FormFeedbackAnimation
          config={{ animationData: loadingAnimation, loop: true, autoplay: true }}
          message={message}
        />
      )}

      {isFormSubmitted && submissionStatus === formStates.DONE && (

        <FormFeedbackAnimation
          config={{ animationData: successAnimation, loop: false, autoplay: true }}
          message={message}
        />
      )}

      {isFormSubmitted && submissionStatus === formStates.ERROR && (
        <FormFeedbackAnimation
          config={{ animationData: errorAnimation, loop: false, autoplay: true }}
          message={message}
        />
      )}
    </form>
  );
}

// eslint-disable-next-line react/prop-types
export default function FormCadastro({ propsDoModal }) {
  const { boxAttributes, onClose } = propsDoModal;
  return (
    <Grid.Row
      marginLeft={0}
      marginRight={0}
      flex={1}
      justifyContent="flex-end"
    >
      <Grid.Col
        display="flex"
        paddingRight={{
          xs: '0',
          md: '0',
        }}
        paddingLeft={{
          xs: '0',
          md: '0',
        }}
        flex={1}
        value={{
          xs: 12,
          md: 5,
          lg: 4,
        }}
      >
        <Box
          boxShadow="-10px 0px 24px rgba(7, 12, 14, 0.1)"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          flex={1}
          padding={{
            xs: '16px',
            md: '85px',
          }}
          backgroundColor="white"
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...boxAttributes}
        >
          <CloseButton onClose={onClose} />

          <FormContent />
        </Box>
      </Grid.Col>
    </Grid.Row>
  );
}

FormCadastro.propTypes = {
  propsDoModal: PropTypes.shape({
    boxAttributes: PropTypes.shape({
      'data-modal-safe-area': PropTypes.string.isRequired,
    }),
    onClose: PropTypes.func,
  }).isRequired,
};
