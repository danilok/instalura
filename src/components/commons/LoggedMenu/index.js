/* eslint-disable @next/next/no-img-element */
import React from 'react';
import PropTypes from 'prop-types';
import Logo from '../../../theme/Logo';
import Link from '../Link';
import LoggedMenuWrapper from './styles/LoggedMenuWrapper';
import Button from '../Button';
import LoggedPageContext from '../../wrappers/LoggedPage/context';
import Text from '../../foundation/Text';
import loginService from '../../../services/login/loginService';

export default function LoggedMenu({ onAdicionarClick }) {
  const loggedPageContext = React.useContext(LoggedPageContext);
  const { user } = loggedPageContext;

  const onLogout = React.useCallback(() => {
    loginService.logout();
  });

  return (
    <LoggedMenuWrapper>
      <LoggedMenuWrapper.Logo>
        <Logo />
      </LoggedMenuWrapper.Logo>
      <LoggedMenuWrapper.Nav>
        <li id="h-search"><img src="/images/search.svg" alt="search" /></li>
        <li id="h-add">
          <Button
            onClick={onAdicionarClick}
          >
            <img src="/images/postIcon.svg" alt="add" />
          </Button>
        </li>
        <li id="h-home">
          <Link href="/app/home">
            <img src="/images/home.svg" alt="home" />
          </Link>
        </li>
        <li id="h-like"><img src="/images/heart.svg" alt="like" /></li>
        <LoggedMenuWrapper.Avatar id="h-avatar">
          <Button>
            <img src={`https://i.pravatar.cc/150?u=${user.id}`} alt="avatar" />
          </Button>
        </LoggedMenuWrapper.Avatar>
        <LoggedMenuWrapper.Dropdown>
          <Link href="/app/profile">
            <Text
              tag="span"
            >
              Perfil
            </Text>
          </Link>
          <Link href="/">
            <Text
              tag="span"
              onClick={onLogout}
            >
              Logout
            </Text>
          </Link>
        </LoggedMenuWrapper.Dropdown>
      </LoggedMenuWrapper.Nav>
    </LoggedMenuWrapper>
  );
}

LoggedMenu.propTypes = {
  onAdicionarClick: PropTypes.func.isRequired,
};
