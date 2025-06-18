require 'rails_helper'

RSpec.describe "Home", type: :request do
  let!(:candidate1) { Candidate.create!(full_name: "Alice") }
  let!(:candidate2) { Candidate.create!(full_name: "Bob") }
  let!(:user1) { User.create!(email: "user1@example.com", password: "password123", zip_code: "11111") }
  let!(:user2) { User.create!(email: "user2@example.com", password: "password456", zip_code: "22222") }

  before do
    Vote.create!(user: user1, candidate: candidate1)
    Vote.create!(user: user2, candidate: candidate2)
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
