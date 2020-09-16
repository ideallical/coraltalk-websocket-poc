import { client } from './apolloClient';
import commentEnteredModerationQueue from './observables/commentEnteredModerationQueue';

const commentEnteredModerationQueueObservable = client.subscribe({
  query: commentEnteredModerationQueue.query,
});

commentEnteredModerationQueueObservable.subscribe(
  commentEnteredModerationQueue.handlers,
);
