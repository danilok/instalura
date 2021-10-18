/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Link from '../Link';
import LoggedMenuWrapper from './styles/LoggedMenuWrapper';

export default function LoggedMenuFooter() {
  return (
    <LoggedMenuWrapper>
      <LoggedMenuWrapper.Nav>
        <li id="home">
          <Link href="/app/profile">
            <img src="/images/home.svg" alt="home" />
          </Link>
        </li>
        <li id="search"><img src="/images/search.svg" alt="search" /></li>
        <li id="add"><img src="/images/postIcon.svg" alt="add" /></li>
        <li id="like"><img src="/images/heart.svg" alt="like" /></li>
        <li id="avatar"><img src="/images/avatar.png" alt="avatar" /></li>
      </LoggedMenuWrapper.Nav>
    </LoggedMenuWrapper>
  );
}
