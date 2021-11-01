/* eslint-disable @next/next/no-img-element */
import React from 'react';
import styled, { css } from 'styled-components';
import breakpointsMedia from '../../../../theme/utils/breakpointsMedia';
import Logo from '../../../../theme/Logo';
import Box from '../../../foundation/layout/Box';
import PostCard from '../../../commons/PostCard';
import GithubLinks from '../../../commons/GithubLinks';

const LoggedHomeWrapper = styled(Box)`
`;

// const LoggedHomeWrapper = styled.div`
//   background-color: white;
//   position: sticky;
//   width: 100%;
//   left: 0;
//   top: 0;
//   display: flex;
//   list-style: none;
//   z-index: 50;

//   ${breakpointsMedia({
//     xs: css`
//       display: flex;
//       flex-direction: row;
//       justify-content: space-evenly;
//       align-items: center;
//       bottom: unset;
//       border-radius: 0;
//       height: 48px;
//     `,
//     md: css`
//       display: none;
//     `,
//   })}
// `;

LoggedHomeWrapper.Logo = styled.div`
   /* background-color: white; */
   background-color: ${({ theme }) => theme.colors.background.main.color};
   position: sticky;
   width: 100%;
   left: 0;
   top: 0;
   display: flex;
   list-style: none;
   z-index: 50;

   ${breakpointsMedia({
    xs: css`
       display: flex;
       flex-direction: row;
       justify-content: space-evenly;
       align-items: center;
       bottom: unset;
       border-radius: 0;
       height: 48px;
     `,
    md: css`
       display: none;
     `,
  })}
`;

// LoggedHomeWrapper.Logo = styled.div`
//   padding: 0;
//   margin: 0;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   width: 40%;
//   flex-grow: 1;
// `;

LoggedHomeWrapper.Body = styled.div`
  padding: 0;
  margin: 0;
  display: flex;
  width: 100%;
  flex-grow: 1;
  justify-content: space-around;

  ${breakpointsMedia({
    xs: css`
      flex-direction: column;
     `,
    md: css`
      flex-direction: row;
      padding-right: 28px;
      padding-left: 28px;
      margin-right: auto;
      margin-left: auto;
     `,
  })}
`;

export default function LoggedHomeScreen() {
  return (
    <LoggedHomeWrapper
      display="flex"
      flexDirection="column"
      flex="1"
      marginTop={{
        xs: '0',
        md: '24px',
      }}
    >
      <LoggedHomeWrapper.Logo>
        <Logo />
      </LoggedHomeWrapper.Logo>
      <LoggedHomeWrapper.Body>
        <PostCard />
        <GithubLinks />
      </LoggedHomeWrapper.Body>
      {/* <Grid.Container
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
            <PostCard />
          </Grid.Col>
          <Grid.Col
            value={{ xs: 12, md: 6 }}
          >
            <GithubLinks />
          </Grid.Col>
        </Grid.Row>
      </Grid.Container> */}
    </LoggedHomeWrapper>
  );
}
