require 'rails_helper'

RSpec.describe "Hands", type: :request do
  describe "GET /new" do
    it "returns http success" do
      get "/hands/new"
      expect(response).to have_http_status(:success)
    end
  end

end
