/* eslint-disable @next/next/no-img-element */
import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Button from '../../commons/Button';
import TextField from '../../forms/TextField';
import Grid from '../../foundation/layout/Grid';
import Box from '../../foundation/layout/Box';
import Text from '../../foundation/Text';
import breakpointsMedia from '../../../theme/utils/breakpointsMedia';
import FiltersSlider from '../../commons/FiltersSlider';
import LoggedPageContext from '../../wrappers/LoggedPage/context';
import postService from '../../../services/post/postService';

const formStates = {
  DEFAULT: 'DEFAULT',
  LOADING: 'LOADING',
  DONE: 'DONE',
  ERROR: 'ERROR',
};

const messagesMap = {
  success: 'Post criado com sucesso!',
  loading: 'Criando post...',
  error: {
    generic: 'Erro ao criar post :(',
  },
};

const Form = styled.form`
  padding-top: 40px;
`;

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

ImageForm.Message = styled.p`
  text-align: center;
`;

const CloseButtonWrapper = styled.div`
  position: relative;
  top: 22px;
  left: 88%;
  cursor: pointer;
`;

ImageForm.Buttons = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

function CloseImageButton({ onClose }) {
  return (
    <CloseButtonWrapper
      id="close-form-imagem"
      onClick={() => {
        onClose();
      }}
    >
      <img src="/images/close_button.svg" alt="Fechar" />
    </CloseButtonWrapper>
  );
}

function FormContent() {
  const [isFormSubmitted, setIsFormSubmitted] = React.useState(false);
  const [submissionStatus, setSubmissionStatus] = React.useState(formStates.DEFAULT);
  const [message, setMessage] = React.useState('');
  const [imageSrc, setImageSrc] = React.useState('/images/image.svg');
  const [selectedFilter, setSelectedFilter] = React.useState('normal');
  const [image, setImage] = React.useState({
    url: '',
    filter: '',
  });
  const [secondStep, setSecondStep] = React.useState(false);
  const loggedPageContext = React.useContext(LoggedPageContext);

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

  const handleDiscard = (() => {
    setImageSrc('/images/image.svg');
    setSelectedFilter('normal');
    setImage({ url: '', filter: '' });
    setSecondStep(false);
    setSubmissionStatus(formStates.DEFAULT);
  });

  const isFormValid = image.url.length === 0;
  const isFormUrlValid = image.url.length === 0;

  return (
    <Form
      id="formImagem"
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
          const post = postService();
          const respostaConvertidaEmObjeto = await post.createPost(postDTO);
          setTimeout(() => {
            setMessage(messagesMap.success);
            setSubmissionStatus(formStates.DONE);
            setImageSrc('/images/image.svg');
            setSelectedFilter('normal');
            setImage({ url: '', filter: '' });
            setSecondStep(false);
            loggedPageContext.updatePosts(respostaConvertidaEmObjeto.data);
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
            <FiltersSlider
              imageUrl={image.url}
              handleFilter={handleFilter}
            />
            <ImageForm.Buttons>
              <Button
                variant="primary.main"
                type="submit"
                disabled={isFormValid}
                fullWidth
              >
                Postar
              </Button>
              <Button
                variant="primary.main"
                type="button"
                disabled={isFormValid}
                onClick={handleDiscard}
              >
                🗑️
              </Button>
            </ImageForm.Buttons>
          </div>
        )}
        {isFormSubmitted && submissionStatus === formStates.LOADING && (
          <ImageForm.Message>
            {message}
          </ImageForm.Message>
        )}

        {isFormSubmitted && submissionStatus === formStates.DONE && (
          <ImageForm.Message>
            {message}
          </ImageForm.Message>
        )}

        {isFormSubmitted && submissionStatus === formStates.ERROR && (
          <ImageForm.Message>
            {message}
          </ImageForm.Message>
        )}
      </ImageForm>
    </Form>
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
      maxWidth={{
        md: '375px',
        lg: '375px',
        xl: '375px',
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
            <CloseImageButton onClose={onClose} />

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

CloseImageButton.propTypes = {
  onClose: PropTypes.func.isRequired,
};
