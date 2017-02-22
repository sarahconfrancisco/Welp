class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  helper_method :current_user, :logged_in?, :calculate_rating, :dd_id

  private

  def dd_id
    dd = Restaurant.find_by(name: "Dunkin Donuts")
    dd.id
  end

  def logged_in?
    !!current_user
  end

  def login(user)
    session[:session_token] = user.reset_token!
    @current_user = user
  end

  def current_user
    return nil unless session[:session_token]
    @current_user ||= User.find_by_token(session[:session_token])
  end

  def logout
    current_user.reset_token!
    session[:session_token] = nil
    @current_user = nil
  end

  def require_login
    render json: {base: ['You need to log in to complete this action']}, status: 401 if !current_user
  end
end
