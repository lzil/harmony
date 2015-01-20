class StaticPagesController < ApplicationController
  before_action :logged_in_user, only: [:dashboard]

  def home
    @user = User.new 
  end

  def about
  end

  def dashboard
  end

  def editor
  end

  def edit
    @article = Article.find(user_params)
  end
  private

    def user_params
      params.require(:user).permit(:username, :email, :password, :password_confirmation)
    end

    def logged_in_user
      unless logged_in?
        redirect_to root_path
      end
    end 
end
