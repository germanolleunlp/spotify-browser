module Response
  def json_response(response)
    render json: response.body, status: response.code
  end

  def json(content, code = :ok)
    render json: content, status: code
  end
end
