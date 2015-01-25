class PermissionsController < ApplicationController

  def create
    
  end    

	def update
    respond_to do |format|
      if @permission.update(permission_params)
        format.html { redirect_to @project, notice: 'Project was successfully updated.' }
      else
        format.html { render :edit }
      end
    end
  end

  private

    def permission_params
      params.require(:permission).permit(:project_id, :permission_id)
    end
end
