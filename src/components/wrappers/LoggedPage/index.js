/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import Box from '../../foundation/layout/Box';
import SEO from '../../commons/SEO';
import LoggedPageContext from './context';
import LoggedMenu from '../../commons/LoggedMenu';
import LoggedMenuFooter from '../../commons/LoggedMenuFooter';

export { LoggedPageContext };

export default function LoggedPageWrapper({
  children,
  seoProps,
  pageBoxProps,
  menuProps,
  profileProps,
}) {
  const [isModalOpen, setModalState] = React.useState(false);

  return (
    <LoggedPageContext.Provider
      value={{
        toggleModalImagem: () => {
          setModalState(!isModalOpen);
        },
        posts: profileProps.posts,
      }}
    >
      <SEO
        {...seoProps}
      />

      <Box
        display="flex"
        flex="1"
        flexDirection="column"
        {...pageBoxProps}
      >
        {menuProps.display && (
          <LoggedMenu />
        )}

        {children}

        {menuProps.display && (
          <LoggedMenuFooter />
        )}

      </Box>

    </LoggedPageContext.Provider>
  );
}

LoggedPageWrapper.defaultProps = {
  seoProps: {},
  pageBoxProps: {},
  menuProps: {
    display: true,
  },
  profileProps: {},
};

LoggedPageWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  seoProps: PropTypes.shape({
    title: PropTypes.string,
  }),
  pageBoxProps: PropTypes.shape({
    flexWrap: PropTypes.string,
    justifyContent: PropTypes.string,
    backgroundColor: PropTypes.string,
    backgroundImage: PropTypes.string,
    backgroundRepeat: PropTypes.string,
    backgroundPosition: PropTypes.string,
  }),
  menuProps: PropTypes.shape({
    display: PropTypes.bool,
  }),
  // eslint-disable-next-line react/forbid-prop-types
  profileProps: PropTypes.object,
};
