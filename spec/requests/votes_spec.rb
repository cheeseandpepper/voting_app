require 'rails_helper'

RSpec.describe "Votes", type: :request do
  let!(:user) { create(:user, email: "user1@example.com", password: "password123", zip_code: "11111") }
  let!(:candidate) { create(:candidate, full_name: "John Doe") }

  before do
    post "/sessions", params: { email: user.email, password: user.password, zip_code: user.zip_code }
  end

  describe "POST /votes" do
    context "when voting for an existing candidate" do
      it "creates a vote successfully" do
        post "/votes", params: { vote: { candidate_id: candidate.id } }
        
        expect(response).to have_http_status(:ok)
        expect(JSON.parse(response.body)["success"]).to eq(true)
        expect(JSON.parse(response.body)["message"]).to include("Vote cast successfully for John Doe")
        
        expect(user.reload.vote).to be_present
        expect(user.vote.candidate).to eq(candidate)
      end

      it "fails when candidate_id is missing" do
        post "/votes", params: { vote: { candidate_id: "" } }
        
        expect(response).to have_http_status(:unprocessable_entity)
        expect(JSON.parse(response.body)["success"]).to eq(false)
        expect(JSON.parse(response.body)["message"]).to eq("Candidate must exist")
      end

      it "fails when candidate_id is invalid" do
        post "/votes", params: { vote: { candidate_id: 999 } }
        
        expect(response).to have_http_status(:unprocessable_entity)
        expect(JSON.parse(response.body)["success"]).to eq(false)
        expect(JSON.parse(response.body)["message"]).to eq("Candidate must exist")
      end
    end

    context "when voting for a new candidate" do
      it "creates a new candidate and vote successfully" do
        post "/votes", params: { 
          vote: { 
            candidate_attributes: { full_name: "Jane Smith" }
          }
        }
         
        expect(response).to have_http_status(:ok)
        expect(JSON.parse(response.body)["success"]).to eq(true)
        expect(JSON.parse(response.body)["message"]).to include("Vote cast successfully for Jane Smith")
        
        new_candidate = Candidate.find_by(full_name: "Jane Smith")
        expect(new_candidate).to be_present
        expect(user.reload.vote).to be_present
        expect(user.vote.candidate).to eq(new_candidate)
      end

      it "fails when candidate name is blank" do
        post "/votes", params: { 
          vote: { 
            candidate_attributes: { full_name: "" }
          }
        }
        
        expect(response).to have_http_status(:unprocessable_entity)
        expect(JSON.parse(response.body)["success"]).to eq(false)
        expect(JSON.parse(response.body)["message"]).to eq("Candidate full name can't be blank, Candidate full name is too short (minimum is 2 characters)")
      end

      it "fails when candidate name is only whitespace" do
        post "/votes", params: { 
          vote: { 
            candidate_attributes: { full_name: "   " }
          }
        }
        
        expect(response).to have_http_status(:unprocessable_entity)
        expect(JSON.parse(response.body)["success"]).to eq(false)
        expect(JSON.parse(response.body)["message"]).to eq("Candidate full name can't be blank")
      end
    end

    context "when user has already voted" do
      before do
        create(:vote, user: user, candidate: candidate)
      end

      it "fails to create a second vote" do
        post "/votes", params: { vote: { candidate_id: candidate.id } }
        
        expect(response).to have_http_status(:unprocessable_entity)
        expect(JSON.parse(response.body)["success"]).to eq(false)
        expect(JSON.parse(response.body)["message"]).to eq("You have already voted")
      end

      it "fails to create a vote for a new candidate" do
        post "/votes", params: { 
          vote: { 
            candidate_attributes: { full_name: "Another Candidate" }
          }
        }
        
        expect(response).to have_http_status(:unprocessable_entity)
        expect(JSON.parse(response.body)["success"]).to eq(false)
        expect(JSON.parse(response.body)["message"]).to eq("You have already voted")
      end
    end

    context "when user is not signed in" do
      before do
        # Sign out the user
        delete "/sessions"
      end

      it "fails to create a vote" do
        post "/votes", params: { vote: { candidate_id: candidate.id } }
        
        expect(response).to have_http_status(:unauthorized)
        expect(JSON.parse(response.body)["success"]).to eq(false)
        expect(JSON.parse(response.body)["message"]).to eq("You must be signed in to access this resource")
      end
    end
  end
end 