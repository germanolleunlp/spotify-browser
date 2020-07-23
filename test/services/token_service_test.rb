require 'test_helper'

class TokenServiceTest < ActiveSupport::TestCase
  test '#get_access_token should do a request to spotify url' do
    stub_request(:post, "#{Spotify::Urls::SPOTIFY_URL}/api/token")
      .with(
        body: {
          client_id: Spotify::Ids::SPOTIFY_CLIENT_ID,
          client_secret: Spotify::Ids::SPOTIFY_CLIENT_SECRET_ID,
          code: 'abc',
          grant_type: 'authorization_code',
          redirect_uri: "#{Spotify::Urls::SPOTIFY_APP_URL}/auth_callback"
        }.to_query
      ).to_return(status: 200, body: 'ok', headers: {})

    response = TokenService.get_access_token('abc')
    assert_equal response.body, 'ok'
  end

  test '#refresh_access_token should do a request to spotify url' do
    stub_request(:post, "#{Spotify::Urls::SPOTIFY_URL}/api/token")
      .with(
        body: {
          client_id: Spotify::Ids::SPOTIFY_CLIENT_ID,
          client_secret: Spotify::Ids::SPOTIFY_CLIENT_SECRET_ID,
          grant_type: 'refresh_token',
          refresh_token: 'abc'
        }.to_query
      ).to_return(status: 200, body: 'ok', headers: {})

    response = TokenService.refresh_access_token('abc')
    assert_equal response.body, 'ok'
  end
end
