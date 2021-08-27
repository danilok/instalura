/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Text from '../../foundation/Text';
import Button from '../../commons/Button';
import Grid from '../../foundation/layout/Grid';
import { WebsitePageContext } from '../../wrappers/WebsitePage';

export default function HomeScreen() {
  const websitePageContext = React.useContext(WebsitePageContext);

  return (
    <Grid.Container
      marginTop={{
        xs: '32px',
        md: '75px',
      }}
    >
      <Grid.Row>
        <Grid.Col
          offset={{ xs: 0, md: 1 }}
          value={{ xs: 12, md: 5 }}
          display="flex"
          alignItems="flex-start"
          justifyContent="center"
          flexDirection="column"
          marginBottom={{
            xs: '40px',
            md: '0',
          }}
        >
          <Text
            variant="title"
            tag="h1"
            color="tertiary.main"
            textAlign={{
              xs: 'center',
              md: 'left',
            }}
          >
            Compartilhe momentos e conecte-se com amigos
          </Text>
          <Text
            variant="paragraph1"
            tag="p"
            color="tertiary.light"
            textAlign={{
              xs: 'center',
              md: 'left',
            }}
          >
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industrys standard dummy text ever since the 1500s.
          </Text>

          <Button
            variant="primary.main"
            margin={{
              xs: 'auto',
              md: 'initial',
            }}
            display="block"
            onClick={() => {
              websitePageContext.toggleModalCadastro();
            }}
          >
            Cadastrar
          </Button>
        </Grid.Col>
        <Grid.Col
          value={{ xs: 12, md: 6 }}
        >
          <img
            alt="Imagem de exemplo do Instalura"
            style={{ display: 'block', margin: 'auto' }}
            src="/images/phones.png"
          />
        </Grid.Col>
      </Grid.Row>
    </Grid.Container>
  );
}
