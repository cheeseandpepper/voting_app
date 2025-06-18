require 'rails_helper'

RSpec.describe "Home", type: :request do
  let!(:candidate1) { create(:candidate, full_name: "Alice") }
  let!(:candidate2) { create(:candidate, full_name: "Bob") }
  let!(:user1) { create(:user, email: "user1@example.com", password: "password123", zip_code: "11111") }
  let!(:user2) { create(:user, email: "user2@example.com", password: "password456", zip_code: "22222") }

  before do
    create(:vote, user: user1, candidate: candidate1)
    create(:vote, user: user2, candidate: candidate2)
  end

  describe "GET /" do
    it "renders successfully and includes candidate names" do
      get root_path
      expect(response).to be_successful
      expect(response.body).to include("Alice")
      expect(response.body).to include("Bob")
    end
  end

  describe "GET /results" do
    it "returns JSON with correct vote counts" do
      get "/results"
      expect(response).to be_successful
      json = JSON.parse(response.body)
      expect(json).to be_an(Array)
      names = json.map { |r| r["name"] }
      expect(names).to include("Alice", "Bob")
      alice_result = json.find { |r| r["name"] == "Alice" }
      bob_result = json.find { |r| r["name"] == "Bob" }
      expect(alice_result["vote_count"].to_i).to eq(1)
      expect(bob_result["vote_count"].to_i).to eq(1)
    end
  end
end
