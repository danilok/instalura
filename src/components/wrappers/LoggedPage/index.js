/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import Box from '../../foundation/layout/Box';
import SEO from '../../commons/SEO';
import LoggedPageContext from './context';
import LoggedMenu from '../../commons/LoggedMenu';
import LoggedMenuFooter from '../../commons/LoggedMenuFooter';
import ImageModal from '../../commons/ImageModal';
import FormImagem from '../../patterns/FormImagem';

export { LoggedPageContext };

export default function LoggedPageWrapper({
  children,
  seoProps,
  pageBoxProps,
  menuProps,
  profileProps,
}) {
  const [isModalOpen, setModalState] = React.useState(false);
  const [posts, setPosts] = React.useState(profileProps.posts);

  const value = React.useMemo(() => ({
    toggleModalImagem: () => {
      setModalState(!isModalOpen);
    },
    updatePosts: (post) => {
      setPosts((currentValues) => ([
        post,
        ...currentValues,
      ]));
    },
    posts,
    user: profileProps.user,
  }), [isModalOpen, posts]);

  return (
    <LoggedPageContext.Provider
      value={value}
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
          <LoggedMenu
            onAdicionarClick={() => setModalState(true)}
          />
        )}

        <ImageModal
          isOpen={isModalOpen}
          onClose={() => {
            setModalState(false);
          }}
        >
          {(propsDoModal) => (
            <FormImagem propsDoModal={propsDoModal} />
          )}
        </ImageModal>

        {children}

        {menuProps.display && (
          <LoggedMenuFooter
            onAdicionarClick={() => setModalState(true)}
          />
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
