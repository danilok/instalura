import styled, { css } from 'styled-components';
import breakpointsMedia from '../../../../theme/utils/breakpointsMedia';

const LoggedMenuWrapper = styled.div`
  background-color: white;
  position: sticky;
  width: 100%;
  left: 0;
  top: 0;
  display: flex;
  list-style: none;
  z-index: 50;

  ${breakpointsMedia({
    xs: css`
      display: none;
    `,
    md: css`
      display: flex;
      flex-direction: row;
      justify-content: space-evenly;
      align-items: center;
      bottom: unset;
      border-radius: 0;
      height: 96px;
    `,
  })}
`;

LoggedMenuWrapper.Logo = styled.div`
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40%;
  flex-grow: 1;

  ${breakpointsMedia({
    md: css`
      height: 64px;
    `,
  })}
`;

LoggedMenuWrapper.Nav = styled.nav`
  padding: 0;
  margin: 0;
  width: 100%;
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;

  ${breakpointsMedia({
    md: css`
      width: 60%;
      justify-content: space-evenly;
      flex-grow: 2;
      order: initial;
      border: none;
      margin: 0;
      padding-top: 0;
      padding-bottom: 0;
    `,
  })}

  button {
    background-color: transparent;
  }

  img {
    width: 32px;
    height: 32px;
    border: 0;
  }

  #h-home {
    order: 3;
  }

  #h-search {
    order: 1;
  }

  #h-add {
    order: 2;
    img {
      width: 40px;
      height: 40px;
    }
  }

  #h-like {
    order: 4;
  }

  #h-avatar {
    order: 5;
  }
`;

LoggedMenuWrapper.Avatar = styled.li`
  img {
    border-radius: 50%;
    border: 2px solid #D7385E;
    border: 0;
  }
`;

LoggedMenuWrapper.Dropdown = styled.div`
  display: none;
  position: absolute;
  background-color: #f1f1f1;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
  float: right;
  top: 65px;
  right: 9%;
  height: 96px;
  border-radius: 8px;
  a {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
  }

  ${LoggedMenuWrapper.Avatar}:hover + & {
    background-color: #fff;
    display: block;
  }

  &:hover {
    background-color: #fff;
    display: block;
  }
`;

export default LoggedMenuWrapper;
