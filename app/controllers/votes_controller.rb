class VotesController < ApplicationController
  def create
    user = User.find_by(id: session[:user_id])
    
    # Check if user has already voted
    if user.vote.present?
      render json: { success: false, message: 'You have already voted' }, status: :unprocessable_entity
      return
    end

    # Handle nested candidate attributes (new candidate)
    if params[:vote][:candidate_attributes]
      candidate_name = params[:vote][:candidate_attributes][:full_name]&.strip
      
      if candidate_name.blank?
        render json: { success: false, message: 'Candidate name cannot be blank' }, status: :unprocessable_entity
        return
      end

      # Create vote with nested candidate attributes
      vote = Vote.new(user: user)
      vote.build_candidate(full_name: candidate_name)
      
      if vote.save
        render json: { 
          success: true, 
          message: "Vote cast successfully for #{vote.candidate.full_name}",
          vote: { id: vote.id, candidate_name: vote.candidate.full_name }
        }
      else
        render json: { success: false, message: vote.errors.full_messages.join(', ') }, status: :unprocessable_entity
      end
    else
      # Handle existing candidate vote
      candidate_id = params[:vote][:candidate_id]
      
      if candidate_id.blank?
        render json: { success: false, message: 'Please select a candidate' }, status: :unprocessable_entity
        return
      end

      candidate = Candidate.find_by(id: candidate_id)
      
      if candidate.nil?
        render json: { success: false, message: 'Invalid candidate selected' }, status: :unprocessable_entity
        return
      end

      # Create vote for existing candidate
      vote = Vote.create!(user: user, candidate: candidate)
      
      render json: { 
        success: true, 
        message: "Vote cast successfully for #{candidate.full_name}",
        vote: { id: vote.id, candidate_name: candidate.full_name }
      }
    end
  rescue ActiveRecord::RecordInvalid => e
    render json: { success: false, message: e.message }, status: :unprocessable_entity
  rescue => e
    Rails.logger.error "Vote creation error: #{e.message}"
    render json: { success: false, message: 'An error occurred while processing your vote' }, status: :internal_server_error
  end
end 