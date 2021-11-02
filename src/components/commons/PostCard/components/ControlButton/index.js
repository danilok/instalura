/* eslint-disable @next/next/no-img-element */
import React from 'react';
import styled, { css } from 'styled-components';
import { PropTypes } from 'prop-types';
import { Lottie } from '@crello/react-lottie';
import Box from '../../../../foundation/layout/Box';
import breakpointsMedia from '../../../../../theme/utils/breakpointsMedia';
import Text, { TextStyleVariantsMap } from '../../../../foundation/Text';

const ControlButtonWrapper = styled(Box)`
  display: flex;
  align-items: center;
`;

ControlButtonWrapper.Button = styled.button`
  border: 0;
  background-color: transparent;
  cursor: pointer;
`;

ControlButtonWrapper.Info = styled.span`
  ${breakpointsMedia({
    xs: css`
      ${TextStyleVariantsMap.smallestException}
    `,
    md: css`
      ${TextStyleVariantsMap.paragraph1}
    `,
  })}
`;

export default function ControlButton({
  onClick,
  value,
  icon,
  alt,
  config,
  playingState,
  direction,
}) {
  return (
    <ControlButtonWrapper>
      <ControlButtonWrapper.Button
        type="button"
        onClick={onClick}
      >
        {icon ? <img src={icon} alt={alt} /> : (
          <Lottie
            width="32px"
            height="32px"
            playingState={playingState}
            direction={direction}
            className="lottie-container basic"
            config={config}
          />
        )}
      </ControlButtonWrapper.Button>
      {value
        ? (
          <Text
            tag="span"
            fontWeight="bold"
          >
            {value}
          </Text>
        )
        : ''}
    </ControlButtonWrapper>
  );
}

ControlButton.propTypes = {
  onClick: PropTypes.func,
  value: PropTypes.string,
  icon: PropTypes.string,
  alt: PropTypes.string,
  config: PropTypes.shape({
    // eslint-disable-next-line react/forbid-prop-types
    animationData: PropTypes.any,
    loop: PropTypes.bool,
    autoplay: PropTypes.bool,
  }),
  playingState: PropTypes.string,
  direction: PropTypes.string,
};

ControlButton.defaultProps = {
  onClick: () => {},
  value: '',
  icon: '',
  alt: '',
  config: {},
  playingState: 'playing',
  direction: '1',
};
