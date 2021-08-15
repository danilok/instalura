import React from 'react';
import PropTypes from 'prop-types';
import { Lottie } from '@crello/react-lottie';
import Box from '../../foundation/layout/Box';

export default function FormFeedbackAnimation({ config, message }) {
  return (
    <Box
      display="flex"
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
    >
      <Lottie
        width="150px"
        height="150px"
        className="lottie-container basic"
        config={config}
      />
      <p>
        {message}
      </p>
    </Box>
  );
}

FormFeedbackAnimation.propTypes = {
  config: PropTypes.shape({
    // eslint-disable-next-line react/forbid-prop-types
    animationData: PropTypes.any,
    loop: PropTypes.bool,
    autoplay: PropTypes.bool,
  }).isRequired,
  message: PropTypes.string,
};

FormFeedbackAnimation.defaultProps = {
  message: '',
};
