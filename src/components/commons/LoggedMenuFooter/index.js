/* eslint-disable @next/next/no-img-element */
import React from 'react';
import PropTypes from 'prop-types';
import Link from '../Link';
import LoggedMenuWrapper from './styles/LoggedMenuWrapper';
import Button from '../Button';
import LoggedPageContext from '../../wrappers/LoggedPage/context';

export default function LoggedMenuFooter({ onAdicionarClick }) {
  const loggedPageContext = React.useContext(LoggedPageContext);
  const { user } = loggedPageContext;
  return (
    <LoggedMenuWrapper>
      <LoggedMenuWrapper.Nav>
        <li id="home">
          <Link href="/app/home">
            <img src="/images/home.svg" alt="home" />
          </Link>
        </li>
        <li id="search"><img src="/images/search.svg" alt="search" /></li>
        <li id="add">
          <Button
            onClick={onAdicionarClick}
          >
            <img src="/images/postIcon.svg" alt="add" />
          </Button>
        </li>
        <li id="like"><img src="/images/heart.svg" alt="like" /></li>
        <li id="avatar">
          <Link href="/app/profile">
            <img src={`https://i.pravatar.cc/150?u=${user.id}`} alt="avatar" />
          </Link>
        </li>
      </LoggedMenuWrapper.Nav>
    </LoggedMenuWrapper>
  );
}

LoggedMenuFooter.propTypes = {
  onAdicionarClick: PropTypes.func.isRequired,
};
