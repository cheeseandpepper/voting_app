class SessionsController < ApplicationController
  def create
    user = User.find_by(email: params[:email])
    
    if user && user.password == params[:password] && user.zip_code == params[:zip_code]
      session[:user_id] = user.id
      render json: { success: true, message: 'Sign in successful', user: { id: user.id, email: user.email } }
    else
      render json: { success: false, message: 'Invalid email, password, or zip code' }, status: :unauthorized
    end
  end

  def destroy
    Rails.logger.info "Sign out requested. Session user_id: #{session[:user_id]}"
    session[:user_id] = nil
    render json: { success: true, message: 'Sign out successful' }
  end

  def status
    if session[:user_id]
      user = User.find_by(id: session[:user_id])
      if user
        has_voted = user.vote.present?
        render json: { 
          signed_in: true, 
          user: { id: user.id, email: user.email },
          has_voted: has_voted
        }
      else
        session[:user_id] = nil
        render json: { signed_in: false }
      end
    else
      render json: { signed_in: false }
    end
  end
end
