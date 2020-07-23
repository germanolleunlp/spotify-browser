require 'test_helper'

class TokenControllerTest < ActionDispatch::IntegrationTest
  test 'should return a new token with the given code' do
    body = {
      access_token: 'token',
      token_type: 'Bearer',
      expires_in: 3600,
      refresh_token: 'refresh_token',
      scope: ''
    }

    response = OpenStruct.new(code: 200, body: body)
    TokenService.stub :get_access_token, response do
      post api_v1_get_token_url, params: { code: 'abc' }
      assert_response :success, body.to_json
    end
  end

  test 'should return a new token with the given refresh code' do
    body = {
      access_token: 'new_token',
      token_type: 'Bearer',
      expires_in: 3600,
      refresh_token: 'new_refresh_token',
      scope: ''
    }

    response = OpenStruct.new(code: 200, body: body)
    TokenService.stub :refresh_access_token, response do
      post api_v1_refresh_token_url, params: { refresh_token: 'abc' }
      assert_response :success, body.to_json
    end
  end
end
