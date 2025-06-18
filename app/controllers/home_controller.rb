class HomeController < ApplicationController
  skip_before_action :ensure_user_logged_in

  def index
    @results = calculate_results
  end

  def results
    @results = calculate_results
    render json: @results
  end

  private

  def calculate_results
    Candidate.left_joins(:votes)
             .group('candidates.id')
             .select('candidates.full_name as name, COUNT(votes.id) as vote_count')
             .order('vote_count DESC')
             .map do |candidate|
      {
        name: candidate.name,
        vote_count: candidate.vote_count
      }
    end
  end
end
