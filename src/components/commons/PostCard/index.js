/* eslint-disable @next/next/no-img-element */
import React from 'react';
import styled, { css } from 'styled-components';
import { PropTypes } from 'prop-types';
import { Lottie } from '@crello/react-lottie';
import likeAnimation from './animations/like-animation.json';
import breakpointsMedia from '../../../theme/utils/breakpointsMedia';
import Box from '../../foundation/layout/Box';
import Text from '../../foundation/Text';
import ControlButton from './components/ControlButton';

const PostCardWrapper = styled(Box)`
  background-color: white;
  max-width: 600px;
  flex: 1;
  max-height: 762px;
  height: fit-content;
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
  // https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_button_on_image
  display: flex;
  flex: 1;

  figure {
    width: 100%;
    margin: 0;
    padding: 0;

    position: relative;
  }

  img {
    width: 100%;
    object-fit: cover;
    &:hover + .hide,
    &:focus + .hide {
      display: block;
    }
  }

  button {
    cursor: pointer;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    background-color: transparent;
    border: none;
    text-align: center;
    width: 100%;
    height: 100%;
    display: none;

    &:hover {
      display: block;
    }
  }

  .container {
    position: relative;
    left: 46%;
  }
`;

PostCardWrapper.Controls = styled(Box)`
  display: flex;
  flex: 1;
  padding: 10px 10px;
  align-items: center;
  justify-content: space-between;

  ${breakpointsMedia({
    sm: css`
      padding: 10px 15px;
    `,
  })}

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
  justify-content: space-between;
`;

PostCardWrapper.ControlsRightSide = styled(Box)`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: flex-end;
`;

PostCardWrapper.Description = styled(Box)`
  display: flex;
  flex: 1;
  padding-bottom: 24px;
  padding-left: 23px;
  padding-right: 28px;
`;

export default function PostCard({
  like,
  username,
  photoUrl,
  description,
  filter,
  likes,
}) {
  const [liked, setLiked] = React.useState(like);
  const [direction, setDirection] = React.useState(like === true ? '1' : '-1');
  const [displayModal, setDisplayModal] = React.useState(false);
  const [likesValues, setLikesValues] = React.useState(likes.length === 0 ? '0' : likes.length.toString());
  const filterName = filter.startsWith('filter-')
    ? filter
    : `filter-${filter}`;

  const onLikeClick = React.useCallback(() => {
    const animationDirection = liked === true ? '-1' : '1';
    const newLikesValues = liked === true ? +likesValues - 1 : +likesValues + 1;
    setLiked(!liked);
    setDirection(animationDirection);
    setLikesValues(newLikesValues === '0' ? '0' : newLikesValues.toString());
  }, [liked]);

  const onButtonClick = React.useCallback(() => {
    setDisplayModal(true);
    setTimeout(() => {
      setDisplayModal(false);
    }, 3000);
  }, [displayModal]);

  return (
    <PostCardWrapper>
      <PostCardWrapper.Header>
        <PostCardWrapper.User>
          <img src="https://avatars.githubusercontent.com/u/624381?v=4" alt="img" />
          <span>{username}</span>
        </PostCardWrapper.User>
        <button
          type="button"
          onClick={onButtonClick}
        >
          ...
        </button>
      </PostCardWrapper.Header>
      <PostCardWrapper.PostImage>
        <figure className={filterName}>
          <img src={photoUrl} alt="img" />
          <button
            type="button"
            className="hide"
            onClick={onLikeClick}
          >
            <Lottie
              width="64px"
              height="64px"
              // playingState={playingState}
              direction={direction}
              className="lottie-container basic container"
              config={{ animationData: likeAnimation, loop: false, autoplay: true }}
            />
          </button>
        </figure>
      </PostCardWrapper.PostImage>
      <PostCardWrapper.Controls>
        <PostCardWrapper.ControlsLeftSide>
          <ControlButton
            onClick={onLikeClick}
            value={likesValues}
            direction={direction}
            config={{ animationData: likeAnimation, loop: false, autoplay: true }}
          />
          <ControlButton
            onClick={onButtonClick}
            value="0"
            icon="/images/message.svg"
            alt="Comentários"
          />
          <ControlButton
            onClick={onButtonClick}
            icon="/images/send.svg"
            alt="Share"
          />
        </PostCardWrapper.ControlsLeftSide>
        <PostCardWrapper.ControlsRightSide>
          <ControlButton
            onClick={onButtonClick}
            icon="/images/bookmark.svg"
            alt="Share"
          />
        </PostCardWrapper.ControlsRightSide>
      </PostCardWrapper.Controls>
      <PostCardWrapper.Description>
        <Text
          tag="span"
          variant="paragraph1"
        >
          {description}
        </Text>
      </PostCardWrapper.Description>
      {displayModal && (
        <div
          style={{
            textAlign: 'center',
            backgroundColor: 'white',
            padding: '10px',
            border: '2px solid gray',
          }}
        >
          <p>Funcionalidade não implementada!</p>
        </div>
      )}
    </PostCardWrapper>
  );
}

PostCard.propTypes = {
  like: PropTypes.bool,
  username: PropTypes.string,
  photoUrl: PropTypes.string,
  description: PropTypes.string,
  filter: PropTypes.string,
  likes: PropTypes.arrayOf(PropTypes.string),
};

PostCard.defaultProps = {
  like: false,
  username: 'username',
  photoUrl: 'https://avatars.githubusercontent.com/u/624381?v=4',
  description: 'Descrição',
  filter: 'aden',
  likes: [],
};
