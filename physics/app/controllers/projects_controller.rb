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
    respond_to do |format|
      if User.exists?(:username => params[:permission][:user_id])
        @user = User.find_by(username: params[:permission][:user_id])
        @permission.user_id = @user.id
        @permission.project_id = @project.id
        @permission.level = "editor"
        @permission.save
        format.html {redirect_to @project, notice: 'Added!' }
      else
        format.html {redirect_to @project, notice: 'Failed!'}
      end
    end
  end

  def rperm
    @perm = Permission.find_by(user_id: params[:uid], project_id: params[:id])
    @perm.destroy
    respond_to do |format|
      format.html { redirect_to project_path(@project), notice: 'Permission was successfully destroyed.' }
    end
  end

  def edit
  end

  def create
    @project = Project.new(project_params)

    respond_to do |format|
      if @project.save
        @permission = Permission.new
        @permission.user_id = current_user.id
        @permission.project_id = @project.id
        @permission.level = "owner"
        @permission.save
        format.html { redirect_to @project, notice: 'Project was successfully created.' }
      else
        format.html { redirect_to dashboard_path }
      end
    end
  end

  def update
    respond_to do |format|
      if @project.update(project_params)
        format.html { redirect_to @project, notice: 'Project was successfully updated.' }
      else
        format.html { redirect_to project_path(@project) }
      end
    end
  end

  def destroy
    @project.destroy
    respond_to do |format|
      format.html { redirect_to root_url, notice: 'Project was successfully destroyed.' }
    end
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
