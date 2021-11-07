/* eslint-disable no-underscore-dangle */
/* eslint-disable @next/next/no-img-element */
import React from 'react';
import styled, { css } from 'styled-components';
import Box from '../../foundation/layout/Box';
import ProfileHeader from '../ProfileHeader';
import breakpointsMedia from '../../../theme/utils/breakpointsMedia';
import { LoggedPageContext } from '../../wrappers/LoggedPage';
import Text from '../../foundation/Text';
import Link from '../Link';

const ProfileContentWrapper = styled(Box)`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

export const ProfileRelationsBoxWrapper = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex: 1;
  ${breakpointsMedia({
    md: css`
      width: 808px;
      margin-left: auto;
      margin-right: auto;
      margin-top: 72px;
    `,
  })}
  ul {
    display: grid;
    grid-gap: 4px;
    grid-template-columns: 1fr 1fr 1fr; 
    list-style: none;
    margin: 0;
    padding: 16px;
    align-content: start;
    ${breakpointsMedia({
    md: css`
      height: 250px;
      grid-gap: 16px;
    `,
  })}
  }
  figure {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
  }
  img {
    object-fit: cover;
    background-position: center center;
    width: 100%;
    height: 100%;
    position: relative;
  }
  ul li a {
    display: inline-block;
    height: 112px;
    position: relative;
    overflow: hidden;
    width: 100%;
    ${breakpointsMedia({
    md: css`
        height: 250px;
      `,
  })}
  }
`;

export default function ProfileContent() {
  const loggedPageContext = React.useContext(LoggedPageContext);
  return (
    <ProfileContentWrapper>
      <ProfileHeader />

      <ProfileRelationsBoxWrapper>
        {loggedPageContext.posts.length === 0 && (
          <Box
            flex={1}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Text
              tag="span"
              variant="subTitle"
            >
              Não há dados... Faça um post!
            </Text>
          </Box>
        )}
        {loggedPageContext.posts.length > 0 && (
          <ul>
            {loggedPageContext.posts.map((itemAtual) => {
              const hasFilter = !!itemAtual.filter;
              let filterName = 'filter-none';
              if (hasFilter) {
                filterName = itemAtual.filter.startsWith('filter-')
                  ? itemAtual.filter
                  : `filter-${itemAtual.filter}`;
              }
              return (
                <li key={itemAtual._id} id={itemAtual._id}>
                  <Link href={`/app/posts/${itemAtual._id}`}>
                    <figure className={filterName}>
                      <img src={itemAtual.photoUrl} loading="lazy" alt={itemAtual.description} />
                    </figure>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </ProfileRelationsBoxWrapper>
    </ProfileContentWrapper>
  );
}
