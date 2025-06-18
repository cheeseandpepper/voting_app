class VotesController < ApplicationController
  def create
    user = User.find_by(id: session[:user_id])
    
    # Check if user has already voted
    if user.vote.present?
      render json: { success: false, message: 'You have already voted' }, status: :unprocessable_entity
      return
    end

    # Create vote with strong parameters (handles both existing and new candidates)
    vote = Vote.new(user: user)
    vote.assign_attributes(vote_params)
    
    if vote.save
      render json: { 
        success: true, 
        message: "Vote cast successfully for #{vote.candidate.full_name}",
        vote: { id: vote.id, candidate_name: vote.candidate.full_name }
      }
    else
      render json: { success: false, message: vote.errors.full_messages.join(', ') }, status: :unprocessable_entity
    end
  rescue ActiveRecord::RecordInvalid => e
    render json: { success: false, message: e.message }, status: :unprocessable_entity
  rescue => e
    Rails.logger.error "Vote creation error: #{e.message}"
    render json: { success: false, message: 'An error occurred while processing your vote' }, status: :internal_server_error
  end

  private

  def vote_params
    params.require(:vote).permit(:candidate_id, candidate_attributes: [:full_name])
  end
end 