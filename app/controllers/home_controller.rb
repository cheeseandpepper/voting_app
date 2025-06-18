class HomeController < ApplicationController
  skip_before_action :ensure_user_logged_in

  def index
    @results = [
      {
        name: "Band 1",
        vote_count: 30
      },
      {
        name: "Band 2",
        vote_count: 20
      },
      {
        name: "Band 3",
        vote_count: 10
      }
    ]
  end
end
