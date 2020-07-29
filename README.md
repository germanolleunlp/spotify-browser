# Spotify Browser

Note: This project was created just for technical training.

## Setup

### Install dependencies

```
bundle
yarn --cwd client install
```

### Add alias in your hosts file

Update your `/etc/hosts` file with the next line

```
127.0.0.1 app.spotify.test
```

### Setup one spotify app

Follow [this guide](https://developer.spotify.com/documentation/general/guides/app-settings/) to setup one spotify app and ensure to add `http://app.spotify.test:3000/auth_callback` in your **Redirect URIs** section.

### Set environment variables

```
cp .env-sample .env
```

And then complete `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET_ID`, `FIGMA_API_ID` and `FIGMA_FILE_ID` with the correct values.

## Run app

For the first time you will need to setup your environment with:

```
bundle exec rake setup
```

And then finally you can start the app with:

```
bundle exec rake start
```

Navigate to http://app.spotify.test:3000

## Run tests

### Client

```
yarn --cwd client test --watchAll=false
```

### API

```
bundle exec rake
```

