/* eslint-disable react/forbid-prop-types */
/* eslint-disable @next/next/no-img-element */
import React from 'react';
import styled, { css } from 'styled-components';
import { PropTypes } from 'prop-types';
import breakpointsMedia from '../../../../theme/utils/breakpointsMedia';
import Logo from '../../../../theme/Logo';
import Box from '../../../foundation/layout/Box';
import GithubLinks from '../../../commons/GithubLinks';
import Feed from '../../../commons/Feed';

const LoggedHomeWrapper = styled(Box)`
`;

LoggedHomeWrapper.Logo = styled.div`
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

LoggedHomeWrapper.Body = styled.div`
  padding: 0;
  margin: 0;
  display: flex;
  width: 100%;
  flex-grow: 1;
  justify-content: center;
  gap: 23px;

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
      gap: 50px;
     `,
  })}
`;

export default function LoggedHomeScreen({ postProps }) {
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
        <Feed postProps={postProps} />
        <GithubLinks />
      </LoggedHomeWrapper.Body>
    </LoggedHomeWrapper>
  );
}

LoggedHomeScreen.propTypes = {
  postProps: PropTypes.object.isRequired,
};
