class ApplicationController < ActionController::Base
  before_action :ensure_user_logged_in

  private

  def ensure_user_logged_in
    unless session[:user_id]
      render json: { success: false, message: 'You must be signed in to access this resource' }, status: :unauthorized
      return
    end
  end
end
