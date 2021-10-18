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
  z-index: 100;

  ${breakpointsMedia({
    xs: css`
      bottom: 0;
      border-radius: 24px 24px 0 0;
      height: 64px;
      box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.04);
    `,
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

  img {
    width: 24px;
    height: 24px;
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

export default LoggedMenuWrapper;
