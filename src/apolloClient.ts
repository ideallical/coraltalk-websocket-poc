import { split } from 'apollo-link';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import fetch from 'cross-fetch';
import { InMemoryCache } from 'apollo-cache-inmemory';
import Websocket from 'ws';
import { settings } from './config';

const { TALK_HOST, TALK_TOKEN } = settings;

// Create an http link:
const httpLink = new HttpLink({
  uri: `${TALK_HOST}/api/graphql`,
  headers: {
    authorization: `Bearer ${TALK_TOKEN}`,
  },

  fetch,
});

// Create a WebSocket link:
const wsLink = new WebSocketLink({
  webSocketImpl: Websocket,

  uri: `ws://${TALK_HOST}/api/graphql/live`,
  options: {
    reconnect: true,
    connectionParams: {
      accessToken: TALK_TOKEN,
    },
  },
});

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});
