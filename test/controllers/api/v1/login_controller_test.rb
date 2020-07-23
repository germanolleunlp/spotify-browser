require 'test_helper'

class LoginControllerTest < ActionDispatch::IntegrationTest
  test 'should redirect to authorize spotify url with correct params' do
    get api_v1_login_url

    params = {
      client_id: Spotify::Ids::SPOTIFY_CLIENT_ID,
      response_type: 'code',
      redirect_uri: "#{Spotify::Urls::SPOTIFY_APP_URL}/auth_callback",
      scopes: 'user-read-email'
    }.to_query

    response = { url: "#{Spotify::Urls::SPOTIFY_URL}/authorize?#{params}" }
    assert_response :success, response.to_json
  end
end
