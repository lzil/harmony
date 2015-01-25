class UsersController < ApplicationController
  before_action :logged_in_user, only: [:index, :show, :update]
  before_action :correct_user, only: [:update]
  
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

  def update
    if @user.update_attributes(user_params)
      flash[:success] = "Profile updated!"
      redirect_to @user
    else
      render 'show'
    end
  end

  private

    def user_params
      params.require(:user).permit(:username, :email, :password, :password_confirmation, :name, :location, :description)
    end

    def logged_in_user
      unless logged_in?
        flash[:danger] = "Please log in."
        redirect_to root_path
      end
    end
    
    def correct_user
      @user = User.find(params[:id])
      redirect_to user_path(@user) unless current_user?(@user) 
    end
end

