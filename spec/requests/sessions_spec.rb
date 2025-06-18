require 'rails_helper'

RSpec.describe "Sessions", type: :request do
  let!(:user) { create(:user, email: "user1@example.com", password: "password123", zip_code: "11111") }

  describe "POST /sessions" do
    it "signs in with correct credentials" do
      post "/sessions", params: { email: user.email, password: user.password, zip_code: user.zip_code }
      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body)["success"]).to eq(true)
    end

    it "fails with incorrect credentials" do
      post "/sessions", params: { email: user.email, password: "wrong", zip_code: user.zip_code }
      expect(response).to have_http_status(:unauthorized)
      expect(JSON.parse(response.body)["success"]).to eq(false)
    end
  end

  describe "DELETE /sessions" do
    it "signs out after sign in" do
      # Sign in first
      post "/sessions", params: { email: user.email, password: user.password, zip_code: user.zip_code }
      expect(session[:user_id]).to eq(user.id)
      delete "/sessions"
      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body)["success"]).to eq(true)
      expect(session[:user_id]).to be_nil
    end

    it "is successful even if not signed in" do
      delete "/sessions"
      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body)["success"]).to eq(true)
      expect(session[:user_id]).to be_nil
    end
  end
end
