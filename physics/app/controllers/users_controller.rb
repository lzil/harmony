class UsersController < ApplicationController
  before_action :logged_in_user, except: [:create]
  before_action :correct_user, only: [:show, :edit, :update]
  before_action :is_liang, only: [:index]
#  
  def index
    @users = User.all
  end

  def show
    @user = User.find(params[:id])
  end

  def dashboard
    @user = current_user
    @projects = @user.projects.all
    @project = Project.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      log_in @user
      flash[:success] = "Congratulations - you've successfully signed up for Harmony! Click the 'Tutorial' tab on the left hand side to learn how to use the editor, or create a new project if you're ready to start!"
      redirect_to dashboard_path
    else
      render 'static_pages/home'
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
      flash[:danger] = "Possible errors: Your email must be unique and follow the pattern 'user@sample.com', and your password must be at least 6 characters long and match the confirmation."
      redirect_to @user
    end
  end

  def destroy
    User.find(params[:id]).destroy
    flash[:success] = 'User was successfully destroyed.'
    redirect_to dashboard_path
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
      redirect_to dashboard_path unless (current_user?(@user) or @user.username == 'liang')
    end

    def is_liang
      redirect_to dashboard_path unless current_user.username == "liang" 
    end
end

