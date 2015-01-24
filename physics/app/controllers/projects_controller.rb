class ProjectsController < ApplicationController
  before_action :set_project, only: [:show, :edit, :update, :destroy]
  before_action :has_permission, only: [:show]
  before_action :is_owner, only: [:destroy, :edit, :update]

  def index
    @projects = Project.all
  end

  def show
  end

  def new
    @project = Project.new
  end

  def edit
  end

  def gperm(other_user)
    permissions.create(project_id: @project.id, user_id: @other_user.id)
  end

  def rperm(other_user)
    permissions.find_by(project_id: @project.id, user_id: @other_user.id).destroy
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
        format.html { render :new }
      end
    end
  end

  def cperm
    @permission = Permission.new(permission_params)
  end

  def update
    respond_to do |format|
      if @project.update(project_params)
        format.html { redirect_to @project, notice: 'Project was successfully updated.' }
      else
        format.html { render :edit }
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
