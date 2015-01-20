class UsersController < ApplicationController

  def show
    @user = User.find(params[:id])
  end

  def new
    @user = User.new
    render "static_pages/home"
  end

  def create
    @user = User.new(user_params)
    if @user.save
      log_in @user
      flash[:success] = "Congratulations! You have successfully signed up <3"
      redirect_to @user
    else
      render 'static_pages/home'
    end
  end

  def edit
    @user = User.find(params[:id])
  end
  private

    def user_params
      params.require(:user).permit(:username, :email, :password, :password_confirmation)
    end 
end

