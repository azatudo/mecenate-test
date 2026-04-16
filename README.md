# Mecenate Test App

Mobile application with a feed of posts (free / paid), built with React Native using Expo.

## Stack

- React Native (Expo)
- TypeScript
- TanStack Query
- Axios

## Features

- Feed with pagination (infinite scroll)
- Pull-to-refresh
- Support for free and paid posts
- Blur + overlay for paid content
- Skeleton loading for better UX
- Error handling with retry button

## Project structure

src/
  entities/post/
    api/
    model/
    ui/
  screens/

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

## Environment variables

No environment variables are required. The API base URL is hardcoded in the client.

## Notes

This project was completed as a test assignment.
