/* eslint-disable no-underscore-dangle */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import styled from 'styled-components';
import { PropTypes } from 'prop-types';
import Box from '../../foundation/layout/Box';
import PostCard from '../PostCard';

const FeedWrapper = styled(Box)`
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li {
    margin-bottom: 24px;
  }
`;

export default function Feed({ postProps }) {
  return (
    <FeedWrapper
      display="flex"
      flexDirection="column"
    >
      {postProps.posts.length > 0 && (
        <ul>
          {postProps.posts.map((itemAtual) => {
            const post = {
              ...postProps,
              post: itemAtual,
            };
            return (
              <li key={post.post._id}>
                <PostCard postProps={post} />
              </li>
            );
          })}
        </ul>
      )}
    </FeedWrapper>
  );
}

Feed.propTypes = {
  postProps: PropTypes.object.isRequired,
};
