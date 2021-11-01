/* eslint-disable @next/next/no-img-element */
import React from 'react';
import styled, { css } from 'styled-components';
import breakpointsMedia from '../../../theme/utils/breakpointsMedia';
import Box from '../../foundation/layout/Box';
import Text from '../../foundation/Text';

const PostCardWrapper = styled(Box)`
  background-color: white;
  max-width: 600px;
  flex: 1;
  max-height: 782px;
`;

PostCardWrapper.Header = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 12px;

  button {
    font-weight: bold;
    font-size: 20px;
    border: 0;
    cursor: pointer;
    background-color: transparent;
  }
`;

PostCardWrapper.User = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex: 1;

  span {
    padding-left: 12px;
  }

  img {    
    width: ${({ size }) => ((size) ? `${size}px` : '32px')};
    height: ${({ size }) => ((size) ? `${size}px` : '32px')};
    border-radius: 50%;
  }
`;

PostCardWrapper.PostImage = styled(Box)`
  display: flex;
  flex: 1;

  figure {
    width: 100%;
    margin: 0;
    padding: 0;
  }

  img {
    width: 100%;
    object-fit: cover;
  }
`;

PostCardWrapper.Controls = styled(Box)`
  display: flex;
  flex: 1;
  padding: 10px 28px;
  align-items: center;

  button > img {
    ${breakpointsMedia({
    xs: css`
      flex-direction: column;
      width: 24px;
      height: 24px;
    `,
    md: css`
      width: 32px;
      height: 32px;
    `,
  })}
  }
`;

PostCardWrapper.ControlsLeftSide = styled(Box)`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-evenly;
`;

PostCardWrapper.Description = styled(Box)`
  display: flex;
  flex: 1;
  padding-bottom: 24px;
  padding-left: 28px;
  padding-right: 28px;
`;

export default function PostCard() {
  return (
    <PostCardWrapper>
      <PostCardWrapper.Header>
        <PostCardWrapper.User>
          <img src="https://avatars.githubusercontent.com/u/624381?v=4" alt="img" />
          <span>user</span>
        </PostCardWrapper.User>
        <button type="button">...</button>
      </PostCardWrapper.Header>
      <PostCardWrapper.PostImage>
        <figure>
          <img src="https://avatars.githubusercontent.com/u/624381?v=4" alt="img" />
        </figure>
      </PostCardWrapper.PostImage>
      <PostCardWrapper.Controls>
        <PostCardWrapper.ControlsLeftSide>
          <button type="button">
            <img src="/images/heart.svg" alt="" />
          </button>
          <span>1k</span>
          <button type="button">
            <img src="/images/message.svg" alt="" />
          </button>
          <span>1k</span>
          <button type="button">
            <img src="/images/send.svg" alt="" />
          </button>
        </PostCardWrapper.ControlsLeftSide>
        <PostCardWrapper.ControlsRightSide>
          <button type="button">
            <img src="/images/send.svg" alt="" />
          </button>
        </PostCardWrapper.ControlsRightSide>
      </PostCardWrapper.Controls>
      <PostCardWrapper.Description>
        <Text
          tag="span"
          variant="paragraph1"
        >
          Que foto, uau!
        </Text>
      </PostCardWrapper.Description>
    </PostCardWrapper>
  );
}
