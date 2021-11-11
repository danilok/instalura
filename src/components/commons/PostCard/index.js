/* eslint-disable no-underscore-dangle */
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
import postService from '../../../services/post/postService';

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
  position: relative;
`;

PostCardWrapper.ImageContainer = styled.figure`
  width: 100%;
  margin: 0;
  padding: 0;
  position: relative;
  max-height: 600px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    max-height: 600px;
  }
`;

PostCardWrapper.LikeButton = styled.button`
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

  ${PostCardWrapper.ImageContainer}:hover + & {
    display: block;
  }

  .container {
    position: relative;
    left: 46%;
  }
`;

PostCardWrapper.Controls = styled(Box)`
  display: flex;
  flex: 1;
  padding: 0 10px;
  padding-top: 10px;
  align-items: center;
  justify-content: space-between;

  ${breakpointsMedia({
    sm: css`
      padding: 0 15px;
      padding-top: 10px;
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
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 23px;
  padding-right: 28px;
  ${breakpointsMedia({
    md: css`
      padding-bottom: 15px;
    `,
    lg: css`
      padding-bottom: 20px;
    `,
  })}
`;

export default function PostCard({
  postProps,
}) {
  const { user, post, home } = postProps;
  if (!user || !post) {
    return (
      <div>
        Error
      </div>
    );
  }
  const like = post.likes && !!post.likes.find((v) => v.user === user.id);
  const [liked, setLiked] = React.useState(like);
  const [direction, setDirection] = React.useState(like === true ? '1' : '-1');
  const [displayModal, setDisplayModal] = React.useState(false);
  const [likesValues, setLikesValues] = React.useState(post.likes.length);
  const [disabled, setDisabled] = React.useState(false);
  const postSrv = postService();

  const hasFilter = !!post.filter;
  let filterName = 'filter-none';
  if (hasFilter) {
    filterName = post.filter.startsWith('filter-')
      ? post.filter
      : `filter-${post.filter}`;
  }

  const onLikeClick = React.useCallback(() => {
    setDisabled(true);
    postSrv.setLike(post._id)
      .then(() => {
        const animationDirection = liked === true ? '-1' : '1';
        setLiked(!liked);
        setDirection(animationDirection);
        setLikesValues((value) => {
          const newLikesValues = (liked === true) ? value - 1 : value + 1;
          return newLikesValues;
        });
        setDisabled(false);
      })
      .catch(() => {
        // eslint-disable-next-line no-console
        console.log('Deu ruim no like');
        setDisabled(false);
      });
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
          <img src={`https://i.pravatar.cc/150?u=${user.id}`} alt={user.username} />
          <span>{user.username}</span>
        </PostCardWrapper.User>
        <button
          type="button"
          onClick={onButtonClick}
        >
          ...
        </button>
      </PostCardWrapper.Header>
      <PostCardWrapper.PostImage>
        <PostCardWrapper.ImageContainer className={filterName}>
          <img src={post.photoUrl} alt="img" loading="lazy" />
        </PostCardWrapper.ImageContainer>
        {!home && (
          <PostCardWrapper.LikeButton
            type="button"
            className="hide"
            onClick={onLikeClick}
            disabled={disabled}
          >
            <Lottie
              width="64px"
              height="64px"
              direction={direction}
              className="lottie-container basic container"
              config={{ animationData: likeAnimation, loop: false, autoplay: true }}
            />
          </PostCardWrapper.LikeButton>
        )}
      </PostCardWrapper.PostImage>
      {!home && (
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
              value={0}
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
              alt="bookmark"
            />
          </PostCardWrapper.ControlsRightSide>
        </PostCardWrapper.Controls>
      )}
      <PostCardWrapper.Description>
        <Text
          tag="span"
          variant="paragraph1"
        >
          {post.description}
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
  postProps: PropTypes.shape({
    user: PropTypes.shape({
      id: PropTypes.string,
      username: PropTypes.string,
    }).isRequired,
    home: PropTypes.bool,
    post: PropTypes.shape({
      _id: PropTypes.string,
      user: PropTypes.string,
      description: PropTypes.string,
      filter: PropTypes.string,
      photoUrl: PropTypes.string,
      likes: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string,
        user: PropTypes.string,
      })),
    }).isRequired,
  }),
};

PostCard.defaultProps = {
  postProps: {
    home: false,
  },
};
