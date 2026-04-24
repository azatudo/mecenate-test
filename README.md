# Mecenate Test App

Mobile application with a feed of posts (free / paid), built with React Native using Expo.

## Stack

- React Native (Expo)
- TypeScript
- TanStack Query
- Axios

## Features

- Infinite scrolling feed using React Query (useInfiniteQuery)
- Tab filtering:
    All
    Free
    Paid
- Pull-to-refresh
- Paid content placeholder cards
- Post previews with:
    Author avatar
    Author name
    Cover image
    Preview text
    Likes count
    Comments count
- Real-time feed updates via WebSocket
- Like state synchronized without reload

## Post Detail Screen
 - Full post content
 - Cover image and author information
 - Animated like button with haptic feedback
 - Comments list with lazy loading / pagination
 - Add new comments
 - Real-time likes and comments via WebSocket
 - Automatic feed/detail cache synchronization through React Query

## Project structure

src/
  entities/post/
    api/
    model/
    ui/
        /postdetail
  navigation/
  screens/
  shared/
    /api
    /hooks
    /store
    /theme
App.tsx

## Run

```bash
npm install
npx expo start
```

## Running with Expo Go

After starting the project:

- Scan the QR code using Expo Go on your device
- Or run on an emulator

## API

The project uses a test API:

https://k8s.mectest.ru/test-app

WebSocket:

https://k8s.mectest.ru/test-app/docs

## Environment variables

No environment variables are required. The API base URL is hardcoded in the client.

WebSocket endpoint configured in:
src/shared/hooks/useWebSocket.ts

## Real-Time Updates

Single application-level WebSocket connection is initialized once and updates:

Likes count in feed

Likes count in detail screen

Comments count in feed

Comments count in detail screen

Cache synchronization is handled through React Query updates.


## State management

React Query
Used for:
  - Feed pagination
  - Post detail fetching
  - Comments pagination
  - Optimistic like updates
  - Real-time cache synchronization

MobX
Used for UI state:
  - Feed filter
  - Pull-to-refresh state



## Notes

WebSocket uses a single shared app-level connection to avoid duplicate subscriptions.

Infinite lists optimized using FlatList.

Feed re-renders synced through React Query cache and FlatList extraData.