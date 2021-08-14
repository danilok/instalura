/* eslint-disable @next/next/no-img-element */
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const CloseButtonWrapper = styled.div`
  position: absolute;
  top: 24px;
  right: 24px;
  cursor: pointer;
`;

export default function CloseButton({ onClose }) {
  return (
    <CloseButtonWrapper
      onClick={() => {
        onClose();
      }}
    >
      <img src="/images/close_button.svg" alt="Fechar" />
    </CloseButtonWrapper>
  );
}

CloseButton.propTypes = {
  onClose: PropTypes.func.isRequired,
};
