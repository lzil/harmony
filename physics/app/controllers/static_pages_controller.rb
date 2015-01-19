class StaticPagesController < ApplicationController

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
end
