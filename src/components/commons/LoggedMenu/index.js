/* eslint-disable @next/next/no-img-element */
import React from 'react';
import PropTypes from 'prop-types';
import Logo from '../../../theme/Logo';
import Link from '../Link';
import LoggedMenuWrapper from './styles/LoggedMenuWrapper';
import Button from '../Button';

export default function LoggedMenu({ onAdicionarClick }) {
  return (
    <LoggedMenuWrapper>
      <LoggedMenuWrapper.Logo>
        <Logo />
      </LoggedMenuWrapper.Logo>
      <LoggedMenuWrapper.Nav>
        <li id="home">
          <Link href="/app/profile">
            <img src="/images/home.svg" alt="home" />
          </Link>
        </li>
        <li id="search"><img src="/images/search.svg" alt="search" /></li>
        <Button
          onClick={onAdicionarClick}
        >
          <img src="/images/postIcon.svg" alt="add" />
        </Button>
        <li id="like"><img src="/images/heart.svg" alt="like" /></li>
        <li id="avatar"><img src="/images/avatar.png" alt="avatar" /></li>
      </LoggedMenuWrapper.Nav>
    </LoggedMenuWrapper>
  );
}

LoggedMenu.propTypes = {
  onAdicionarClick: PropTypes.func.isRequired,
};
