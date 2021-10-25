/* eslint-disable @next/next/no-img-element */
import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import get from 'lodash/get';
// import * as yup from 'yup';
import successAnimation from '../animations/success.json';
import errorAnimation from '../animations/error.json';
import loadingAnimation from '../animations/loading.json';
import Button from '../../commons/Button';
import TextField from '../../forms/TextField';
// import useForm from '../../../infra/hooks/form/useForm';
// import loginService from '../../../services/login/loginService';
import FormFeedbackAnimation from '../FormFeedbackAnimation';
import Grid from '../../foundation/layout/Grid';
import Box from '../../foundation/layout/Box';
import CloseButton from '../../commons/CloseButton';
import Text from '../../foundation/Text';
import breakpointsMedia from '../../../theme/utils/breakpointsMedia';
import FiltersSlider from '../../commons/FiltersSlider';
import authService from '../../../services/auth/authService';

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

const ImagePlaceholder = styled(Box)`
  background-color: ${(props) => get(props.theme, `colors.${props.color}.color`)};
  height: 375px;
  display: flex;
  justify-content: center;
  align-items: center;
  ${breakpointsMedia({
    xs: css`
      width: 100%;
    `,
    md: css`
      width: 375px;
    `,
  })}

  figure {
    width: 375px;
    height: 375px;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  img {
    max-width: 375px;
    max-height: 375px;
  }
`;

const ImageForm = styled(Box)`
  padding: 16px;
`;

function FormContent() {
  const [isFormSubmitted, setIsFormSubmitted] = React.useState(false);
  const [submissionStatus, setSubmissionStatus] = React.useState(formStates.DEFAULT);
  const [message, setMessage] = React.useState('');
  const [imageSrc, setImageSrc] = React.useState('/images/image.svg');
  const [selectedFilter, setSelectedFilter] = React.useState('normal');
  const [image, setImage] = React.useState({
    url: '',
    filter: '',
    // usuario: 'danilo@email.com',
    // nome: 'danilo',
  });
  const [secondStep, setSecondStep] = React.useState(false);

  const handleChange = React.useCallback((event) => {
    const fieldName = event.target.getAttribute('name');
    setImage((currentValues) => ({
      ...currentValues,
      [fieldName]: event.target.value,
    }));
  }, [setImage]);

  const handleNext = (() => {
    if (!image.url) {
      return;
    }
    setImageSrc(image.url);
    setSecondStep(true);
  });

  const handleFilter = ((event) => {
    const clickedItem = event.target.closest('li');
    const newFilter = clickedItem.dataset.filter;
    setSelectedFilter(newFilter);
    setImage((currentValues) => ({
      ...currentValues,
      filter: newFilter,
    }));
  });

  /* const isFormValid = image.url.length === 0 || image.filter.length === 0; */
  const isFormValid = image.url.length === 0;
  const isFormUrlValid = image.url.length === 0;

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();

        setIsFormSubmitted(true);
        const postDTO = {
          photoUrl: image.url,
          description: 'Imagem teste',
          filter: image.filter, // Remember to add options as named here: https://picturepan2.github.io/instagram.css/
        };

        try {
          setMessage(messagesMap.loading);
          setSubmissionStatus(formStates.LOADING);
          const auth = authService();
          const token = auth.getToken();
          const respostaDoServidor = await fetch('https://instalura-api.vercel.app/api/posts', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(postDTO),
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
            setImageSrc('/images/image.svg');
            setSelectedFilter('normal');
            setImage({ url: '', filter: '' });
            setSecondStep(false);
          }, 1000);
        } catch (error) {
          setTimeout(() => {
            setMessage(error.message);
            setSubmissionStatus(formStates.ERROR);
          }, 1000);
        }
      }}
    >
      <ImagePlaceholder
        color="tertiary.darkMain"
      >
        <figure className={`filter-${selectedFilter}`}>
          <img src={imageSrc} alt="Imagem" />
        </figure>
      </ImagePlaceholder>
      <ImageForm>
        {!secondStep && (
          <>
            <div>
              <TextField
                placeholder="URL da imagem"
                name="url"
                value={image.url}
                onChange={handleChange}
              />
              <Text
                variant="paragraph2"
                tag="p"
                color="tertiary.light"
                marginBottom="38px"
                textAlign="center"
              >
                Formatos suportados: jpg, png, svg e xpto.
              </Text>
            </div>
            <Button
              variant="primary.main"
              type="button"
              disabled={isFormUrlValid}
              fullWidth
              onClick={handleNext}
            >
              Avançar
            </Button>
          </>
        )}
        {secondStep && (
          <div>
            <FiltersSlider handleFilter={handleFilter} />
            <Button
              variant="primary.main"
              type="submit"
              disabled={isFormValid}
              fullWidth
            >
              Postar
            </Button>
          </div>
        )}
      </ImageForm>
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

export default function FormImagem({ propsDoModal }) {
  const { boxAttributes, onClose } = propsDoModal;
  // // const [submissionStatus, setSubmissionStatus] = React.useState(formStates.DEFAULT);
  // const router = useRouter();
  // const initialValues = {
  //   usuario: '',
  //   senha: '',
  //   // usuario: 'omariosouto',
  //   // senha: 'senhasegura',
  // };

  // const form = useForm({
  //   initialValues,
  //   onSubmit: (values) => {
  //     form.setIsFormDisabled(true);
  //     setSubmissionStatus(formStates.LOADING);
  //     loginService.login({
  //       username: values.usuario,
  //       password: values.senha,
  //     })
  //       .then(() => {
  //         setSubmissionStatus(formStates.DONE);
  //         router.push('/app/profile');
  //       })
  //       .catch(() => {
  //         setSubmissionStatus(formStates.ERROR);
  //       })
  //       .finally(() => {
  //         form.setIsFormDisabled(false);
  //       });
  //   },
  //   // validateSchema: async (values) => loginSchema.validate(values, { abortEarly: false }),
  // });

  return (
    <Grid.Container
      display="flex"
      flex={1}
      paddingRight={{
        xs: '0',
        md: '0',
      }}
      paddingLeft={{
        xs: '0',
        md: '0',
      }}
    >
      <Grid.Row
        marginLeft={0}
        marginRight={0}
        flex={1}
        justifyContent="center"
        alignItems="center"
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
          height={{
            xs: '100%',
            md: '667px',
          }}
        >
          <Box
            boxShadow="-10px 0px 24px rgba(7, 12, 14, 0.1)"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            flex={1}
            backgroundColor="white"
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...boxAttributes}
          >
            <CloseButton onClose={onClose} />

            <FormContent />
          </Box>
        </Grid.Col>
      </Grid.Row>
    </Grid.Container>
  );
}

FormImagem.propTypes = {
  propsDoModal: PropTypes.shape({
    boxAttributes: PropTypes.shape({
      'data-modal-safe-area': PropTypes.string.isRequired,
    }),
    onClose: PropTypes.func,
    onSubmit: PropTypes.func,
  }).isRequired,
};
