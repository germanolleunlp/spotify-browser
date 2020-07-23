class TokenService
  include HTTParty
  base_uri "#{Spotify::Urls::SPOTIFY_URL}/api"

  def self.get_access_token(code)
    post(
      '/token',
      body: {
        client_id: Spotify::Ids::SPOTIFY_CLIENT_ID,
        client_secret: Spotify::Ids::SPOTIFY_CLIENT_SECRET_ID,
        code: code,
        grant_type: 'authorization_code',
        redirect_uri: "#{Spotify::Urls::SPOTIFY_APP_URL}/auth_callback"
      }
    )
  end

  def self.refresh_access_token(refresh_token)
    post(
      '/token',
      body: {
        client_id: Spotify::Ids::SPOTIFY_CLIENT_ID,
        client_secret: Spotify::Ids::SPOTIFY_CLIENT_SECRET_ID,
        grant_type: 'refresh_token',
        refresh_token: refresh_token
      }
    )
  end
end
