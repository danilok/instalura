import styled, { css } from 'styled-components';
import breakpointsMedia from '../../../../theme/utils/breakpointsMedia';

const LoggedMenuWrapper = styled.div`
  background-color: white;
  position: sticky;
  width: 100%;
  left: 0;
  bottom: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  list-style: none;
  z-index: 50;
  border-radius: 24px 24px 0 0;
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.04);

  ${breakpointsMedia({
    md: css`
      display: none;
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
  padding: 0 12px;

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

  img {
    width: 24px;
    height: 24px;
  }

  button {
    background-color: transparent;
  }

  #home {
    order: 1;
  }

  #search {
    order: 2;
  }

  #add {
    order: 3;
    img {
      width: 40px;
      height: 40px;
    }
  }

  #like {
    order: 4;
  }

  #avatar {
    order: 5;
    img {
      border-radius: 50%;
      border: 2px solid #D7385E;
    }
  }
`;

LoggedMenuWrapper.Avatar = styled.li`
  button {
    padding: 5px;
  }

  img {
    border-radius: 50%;
    border: 2px solid #D7385E;
    border: 0;
  }
`;

LoggedMenuWrapper.Dropdown = styled.div`
  position: absolute;
  background-color: #fff;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  border-radius: 8px;
  z-index: 1;
  float: right;
  bottom: 50px;
  right: 10px;
  height: 96px;
  a {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
  }
`;

export default LoggedMenuWrapper;
