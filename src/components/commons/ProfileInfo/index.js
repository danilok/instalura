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
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  title: PropTypes.string.isRequired,
  variantTitle: PropTypes.string,
  variantValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

ProfileInfo.defaultProps = {
  variantTitle: 'profileTitle',
  variantValue: 'profileInfo',
};
