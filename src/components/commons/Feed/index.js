/* eslint-disable no-underscore-dangle */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import styled from 'styled-components';
import { PropTypes } from 'prop-types';
import Box from '../../foundation/layout/Box';
import PostCard from '../PostCard';
import LoggedPageContext from '../../wrappers/LoggedPage/context';
import Text from '../../foundation/Text';

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
  const loggedPageContext = React.useContext(LoggedPageContext);
  return (
    <FeedWrapper
      display="flex"
      flexDirection="column"
    >
      {loggedPageContext.posts.length === 0 && (
        <Box
          flex={1}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Text
            tag="span"
            variant="subTitle"
          >
            Não há dados... Faça um post!
          </Text>
        </Box>
      )}
      {loggedPageContext.posts.length > 0 && (
        <ul>
          {loggedPageContext.posts.map((itemAtual) => {
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
