import React from 'react';
import styled, { css, createGlobalStyle } from 'styled-components';
import { PropTypes } from 'prop-types';
import { motion } from 'framer-motion';

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  background: rgba(0,0,0,0.1);
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  margin: auto;
  overflow: scroll;
  transition: .5s;
  z-index: ${({ theme }) => theme.zIndex.modal};

  ${({ isOpen }) => {
    if (isOpen) {
      return css`
        opacity: 1;
        pointer-events: all;
      `;
    }

    return css`
      opacity: 0;
      pointer-events: none;
    `;
  }}
`;

const LockScroll = createGlobalStyle`
  body {
    overflow: hidden
  }
`;

export default function Modal({ isOpen, onClose, children }) {
  return (
    <ModalWrapper
      isOpen={isOpen}
      onClick={(event) => {
        const isSafeArea = event.target.closest('[data-modal-safe-area="true"]');
        if (!isSafeArea) {
          onClose();
        }
      }}
    >
      {isOpen && <LockScroll />}

      <motion.div
        variants={{
          open: {
            x: 0,
            opacity: 1,
            scale: 1,
          },
          closed: {
            x: '100%',
            opacity: 0.4,
            scale: 0.5,
          },
        }}
        animate={isOpen ? 'open' : 'closed'}
        transition={{
          duration: 0.5,
        }}
        style={{
          display: 'flex',
          flex: 1,
        }}
      >
        {children({
          boxAttributes: {
            'data-modal-safe-area': 'true',
          },
          onClose,
        })}
      </motion.div>
    </ModalWrapper>
  );
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.func.isRequired,
};
