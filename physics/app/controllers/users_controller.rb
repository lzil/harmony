class UsersController < ApplicationController
  before_action :logged_in_user, except: [:create]
  before_action :correct_user, only: [:show, :edit, :update]
  
  def index
    @users = User.all
  end

  def show
    @user = User.find(params[:id])
  end

  def dashboard
    @user = current_user
    @projects = @user.projects.all
  end

  def create
    @user = User.new(user_params)
    if @user.save
      log_in @user
      flash[:success] = "Congratulations - you've successfully signed up for Harmony!"
      redirect_to tutorial_path
    else
      flash[:danger2] = "Your email must be in the form user@sample.com, and your passwords must match."
      redirect_to root_path
    end
  end

  def edit
    @user = User.find(params[:id])
  end

  def update
    if @user.update_attributes(user_params)
      flash[:success] = "Profile updated!"
      redirect_to @user
    else
      flash[:danger] = "Your email must follow the pattern user@sample.com, and your passwords must match."
      redirect_to @user
    end
  end

  private

    def user_params
      params.fetch(:user, {}).permit(:username, :email, :password, :password_confirmation, :name, :location, :description)
    end

    def logged_in_user
      unless logged_in?
        flash[:danger] = "Please log in."
        redirect_to root_path
      end
    end
    
    def correct_user
      @user = User.find(params[:id])
      redirect_to dashboard_path unless current_user?(@user) 
    end
end

