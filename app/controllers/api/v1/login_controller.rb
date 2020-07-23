module Api
  module V1
    class LoginController < ApiController
      def show
        authorize_params = {
          client_id: Spotify::Ids::SPOTIFY_CLIENT_ID,
          response_type: 'code',
          redirect_uri: "#{Spotify::Urls::SPOTIFY_APP_URL}/auth_callback",
          scopes: 'user-read-email'
        }.to_query

        json(url: "#{Spotify::Urls::SPOTIFY_URL}/authorize?#{authorize_params}")
      end
    end
  end
end
