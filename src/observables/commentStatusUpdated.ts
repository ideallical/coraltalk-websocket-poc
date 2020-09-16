/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-undef */
/* eslint-disable no-console */
import gql from 'graphql-tag';

const query = gql`
  subscription {
    commentStatusUpdated {
      newStatus
      oldStatus
      moderator {
        id
        username
        emailVerified
      }
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
    console.info('Handling "commentStatusUpdated"');

    const {
      newStatus,
      oldStatus,
      comment,
      moderator,
    } = result.data.commentStatusUpdated;
    const { username: moderatorUsername } = moderator;
    const { author, body, id: commentId } = comment;
    const { id: authorId, username: authorUsername } = author;

    console.log(
      `New Status: ${newStatus}\n` + `Old Status: ${oldStatus}\n`,
      `Comment: ${commentId}\n` +
        `Moderated by: ${moderatorUsername}\n` +
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
