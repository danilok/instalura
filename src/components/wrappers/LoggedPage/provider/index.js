import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import theme from '../../../../theme';
import GlobalStyle from '../../../../theme/GlobalStyle';

export default function LoggedGlobalProvider({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
}

LoggedGlobalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
