import { client } from './apolloClient';
import commentEnteredModerationQueue from './observables/commentEnteredModerationQueue';
import commentLeftModerationQueue from './observables/commentLeftModerationQueue';
import commentStatusUpdated from './observables/commentStatusUpdated';

const commentEnteredModerationQueueObservable = client.subscribe({
  query: commentEnteredModerationQueue.query,
});

commentEnteredModerationQueueObservable.subscribe(
  commentEnteredModerationQueue.handlers,
);

const commentLeftModerationQueueObservable = client.subscribe({
  query: commentLeftModerationQueue.query,
});

commentLeftModerationQueueObservable.subscribe(
  commentLeftModerationQueue.handlers,
);

const commentStatusUpdatedObservable = client.subscribe({
  query: commentStatusUpdated.query,
});

commentStatusUpdatedObservable.subscribe(commentStatusUpdated.handlers);
