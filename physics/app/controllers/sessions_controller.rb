class SessionsController < ApplicationController
  def new
    render 'static_pages/editor'
  end

  def create
    user = User.find_by(username: params[:session][:username].downcase)
    if user && user.authenticate(params[:session][:password])
      log_in user
      redirect_to dashboard_path
    else
      flash.now[:danger] = "Invalid username/password combo. Try again!!!!"
      render 'static_pages/home'
    end
  end

  def destroy
    log_out if logged_in?
    redirect_to root_url
  end
end
