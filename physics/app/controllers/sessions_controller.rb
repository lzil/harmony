class SessionsController < ApplicationController
  def new

  end

  def create
    user = User.find_by(username: params[:session][:username].downcase)
    if user && user.authenticate(params[:session][:password])
      log_in user
      redirect_to user
    else
      flash.now[:danger] = "Invalid username/password combo. Try again!!!!"
      render 'static_pages/home'
    end
  end

  def destroy
  end
end
