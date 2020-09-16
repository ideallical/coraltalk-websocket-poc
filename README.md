# Websocket client POC that listens to CoralTalk V6 events

Coral Talk v6 provides a way to subscribe to events via GraphQL.
This project is a proof of concept (POC) to show that it's possible via NodeJS.

The code is inspired by [this github issue][coraltalk_issue2876]


## Installation
```sh
nvm use v12.10.0
npm install
npm run build
```

## Configuration
By default the websocket client assumes that you run Coral Talk locally on:
`http://localhost:3000` which corresponds to the GraphQL server websocket running on: `ws://localhost:3000/api/graphql/live`

You can alter the client configration in `src/config.ts`
To get the value of `TALK_TOKEN` read `How to get value of TALK_TOKEN`

## Run client
To start the websocket client and listen to CoralTalk events:

```sh
npm run start
```

## How to get value of TALK_TOKEN
First create a short lived (default 90 days) token:
```sh
curl --request POST \
--url http://localhost:3000/api/auth/local \
--header 'content-type: application/json' \
--data '{ "email": "admin@example.com", "password": "peanutbutter123"}'
```

This returns a response similar to:
```json
{
  "token": "${TOKEN}"
}
```

You can turn this short lived token into a long lived access token (or Personal Access Token) by exchanging the short lived token generated above:
```sh
curl --request POST \
--url "http://localhost:3000/api/graphql" \
--header 'authorization: Bearer ${TOKEN}' \
--header 'content-type: application/json' \
--data '{"query":"mutation CreateAccessToken { createToken(input: { clientMutationId: \"\", name: \"My PAT\" }) { signedToken }}","operationName":"CreateAccessToken"}'
```

Which returns a response similar to:
```json
{
  "data": {
    "createToken": {
      "signedToken": "${TOKEN}"  <--- here's your `TALK_TOKEN` value
    }
  }
}
```

# Available subscription events
These events are currently available in Coral Talk v6 to subscribe to (2020-09-16):

### Implemented in POC
- commentEnteredModerationQueue `COMMENT_ENTERED_MODERATION_QUEUE`
- commentLeftModerationQueue `COMMENT_LEFT_MODERATION_QUEUE`
- commentStatusUpdated `COMMENT_STATUS_UPDATED`

### Not (yet) implemented in POC
- commentReplyCreated `COMMENT_REPLY_CREATED`
- commentCreated `COMMENT_CREATED`
- commentFeatured `COMMENT_FEATURED`
- commentReleased `COMMENT_RELEASED`

[coraltalk_issue2876]: https://github.com/coralproject/talk/issues/2876
