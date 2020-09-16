/* eslint-disable no-undef */
/* eslint-disable no-console */
import { client } from './apolloClient';
import gql from 'graphql-tag';

const observeableCommentEnteredModerationQueue = client.subscribe({
  query: gql`
    subscription {
      commentEnteredModerationQueue {
        comment {
          id
          author {
            id
          }
          createdAt
          status
        }
      }
    }
  `,
});

observeableCommentEnteredModerationQueue.subscribe(
  response => {
    const { comment } = response.data.commentEnteredModerationQueue;
    const { author, id: commentId, status } = comment;
    const { id: authorId } = author;

    console.log(
      `Comment: ${commentId}, status: ${status}, authorId: ${authorId}`,
    );
  },
  error => {
    console.log('onError: %s', error, error.graphQLErrors);
  },
  () => {
    console.log('onCompleted');
  },
);
