class StaticPagesController < ApplicationController
  layout "mainlay", only: [:home]

  def create
#    @user = User.new(user_params)
#    if @user.save
#      redirect_to @user
#    else
#      render 'static_pages/home'
#    end
  end
  def home
    @user = User.new 
  end

  def about
  end

  def edit
    @article = Article.find(user_params)
  end
  private

    def user_params
      params.require(:user).permit(:username, :email, :password, :password_confirmation)
    end
end
