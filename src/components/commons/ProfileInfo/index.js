import React from 'react';
import PropTypes from 'prop-types';
import Box from '../../foundation/layout/Box';
import Text from '../../foundation/Text';

export default function ProfileInfo({
  value,
  title,
  variantTitle,
  variantValue,
}) {
  return (
    <Box>
      <Text
        tag="p"
        variant={variantTitle}
        margin="0"
      >
        {value}
      </Text>
      <Text
        tag="span"
        variant={variantValue}
      >
        {title}
      </Text>
    </Box>
  );
}

ProfileInfo.propTypes = {
  value: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  variantTitle: PropTypes.string,
  variantValue: PropTypes.string,
};

ProfileInfo.defaultProps = {
  variantTitle: 'profileTitle',
  variantValue: 'profileInfo',
};
