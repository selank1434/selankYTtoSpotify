# App Setup Instructions

This README provides instructions on how to create and configure a new app using the Google Developer Console and Spotify's Developer Dashboard. You will need to obtain your `client_id` and `client_secret` keys for both Spotify and YouTube, and use them to configure your app.

## Prerequisites

- A **Spotify Developer Account**: Create an app on [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/applications).
- A **Google Developer Account**: Create a project and OAuth credentials in the [Google Cloud Console](https://console.developers.google.com/).

Once your developer accounts are set up, you'll be able to generate the required `client_id` and `client_secret` keys for your application.

## Steps to Create the App

### 1. **Spotify App Setup**
   
   1. Go to the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/applications).
   2. Log in with your Spotify account.
   3. Click **Create an App**.
   4. Fill in the app name and description, and agree to the terms.
   5. After the app is created, you'll be given a `Client ID` and `Client Secret`. Save them securely as you’ll need these for the app configuration.
   6. Set up the **Redirect URI(s)**. You'll need to set the redirect URI to the following:
      - `http://localhost:8000/callback-spotify`

### 2. **Google API Console (YouTube App) Setup**

   1. Go to the [Google Developer Console](https://console.developers.google.com/).
   2. Click **Create Project** and fill in the project details.
   3. After the project is created, navigate to the **APIs & Services** > **Credentials** tab.
   4. Click on **Create Credentials** and select **OAuth 2.0 Client IDs**.
   5. Follow the steps to configure your app's credentials (including redirect URIs).
   6. Set the **Redirect URI** for Google as:
      - `http://localhost:8000/callbackyoutube`
   7. Once created, you will get a **Client ID** and **Client Secret**.

### 3. **Configure Environment Variables**

   After obtaining the `client_id` and `client_secret` values for both Spotify and YouTube, you need to configure them in your application's environment.

   Create a `.env` file in the root directory of your project and add the following:

   ```plaintext
   PORT=8000

   # Spotify Credentials
   SPOTIFY_CLIENT_ID=<YOUR_SPOTIFY_CLIENT_ID>
   SPOTIFY_CLIENT_SECRET=<YOUR_SPOTIFY_CLIENT_SECRET>

   # Cookie Encryption Key
   COOKIE_ENCRYPT_KEY=<YOUR_ENCRYPT_KEY>

   # YouTube Credentials
   YOUTUBE_CLIENT_ID=<YOUR_YOUTUBE_CLIENT_ID>
   YOUTUBE_CLIENT_SECRET=<YOUR_YOUTUBE_CLIENT_SECRET>
