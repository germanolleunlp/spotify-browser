module Api
  module V1
    class Api::V1::TokenController < ApiController
      def create
        json_response(TokenService.get_access_token(params[:code]))
      end

      def refresh
        json_response(TokenService.refresh_access_token(params[:refresh_token]))
      end
    end
  end
end
