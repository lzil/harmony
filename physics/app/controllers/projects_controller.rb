class ProjectsController < ApplicationController
  layout "play", only: [:show]
  before_action :logged_in_user
  before_action :set_project, only: [:show, :gperm, :rperm, :edit, :update, :destroy]
  before_action :has_permission, only: [:show]
  before_action :is_owner, only: [:destroy, :edit, :update, :gperm, :rperm]

  def index
    @projects = Project.all
  end

  def show
    @permission = Permission.new
  end

  def gperm
    set_project
    @permission = Permission.new
    if User.exists?(:username => params[:permission][:user_id])
      @user = User.find_by(username: params[:permission][:user_id])
      if Permission.where(:user_id => @user.id, :project_id => @project.id).blank?
        @permission.user_id = @user.id
        @permission.project_id = @project.id
        @permission.level = "editor"
        @permission.save
        flash.now[:success] = "Permission added!"
      else
        flash.now[:danger] = "This user already has permission!"
      end
    else
      flash.now[:danger] = "This user doesn't exist!"
    end
    redirect_to project_path(@project)
  end

  def rperm
    @perm = Permission.find_by(user_id: params[:uid], project_id: params[:id])
    @perm.destroy
    flash.now[:danger] = "Permission was successfully revoked."
    redirect_to project_path(@project)
  end

  def edit
  end

  def create
    @project = Project.new(project_params)

    if @project.save
      @permission = Permission.new
      @permission.user_id = current_user.id
      @permission.project_id = @project.id
      @permission.level = "owner"
      @permission.save
      flash[:success] = "Project was successfully created."
      redirect_to @project
    else
      flash[:danger] = "Project name must be nonempty and less than 40 characters."
      redirect_to dashboard_path
    end
  end

  def update
    if @project.update(project_params)
      flash[:success] = "Project was successfully updated."
    else
      flash[:danger] = 'Project name must be nonempty and less than 40 characters.'
    end
    redirect_to @project
  end

  def destroy
    @project.destroy
    flash[:success] = 'Project was successfully destroyed.'
  end

  private

    def logged_in_user
      unless logged_in?
        flash[:danger] = "Please log in."
        redirect_to root_path
      end
    end
    # Use callbacks to share common setup or constraints between actions.
    def set_project
      @project = Project.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def project_params
      params.require(:project).permit(:name, :description)
    end

    def has_permission
      @project = Project.find(params[:id])
      @permission = Permission.find_by(user_id: current_user.id, project_id: @project.id)
      redirect_to(dashboard_path) unless @permission
    end

    def is_owner
      @project = Project.find(params[:id])
      @permission = Permission.find_by(user_id: current_user.id, project_id: @project.id)
      redirect_to(dashboard_path) unless @permission.level == "owner"
    end

end
