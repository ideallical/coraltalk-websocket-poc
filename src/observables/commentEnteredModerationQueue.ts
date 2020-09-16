/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-undef */
/* eslint-disable no-console */
import gql from 'graphql-tag';

const query = gql`
  subscription {
    commentEnteredModerationQueue {
      queue
      comment {
        id
        author {
          id
          username
          emailVerified
          role
        }
        body
        createdAt
        status
        parent {
          id
          body
          createdAt
          status
        }
        rootParent {
          id
          body
          createdAt
          status
        }
        permalink
      }
    }
  }
`;

const handlers = {
  next(result: any) {
    const { comment, queue } = result.data.commentEnteredModerationQueue;
    const { author, body, id: commentId, status } = comment;
    const { id: authorId, username: authorUsername } = author;

    console.log(
      `Queue: ${queue}\n` +
        `Comment: ${commentId}\n` +
        `status: ${status}\n` +
        `authorId: ${authorId}\n` +
        `authorUsername: ${authorUsername}\n` +
        `body: ${body}\n`,
    );
  },
  error(err: any) {
    console.log('onError: %s', err, err.graphQLErrors);
  },
};

export default {
  handlers,
  query,
};
