class PermissionsController < ApplicationController

  def create
  end

  private

    def permission_params
      params.require(:permission).permit(:project_id, :permission_id)
    end
end
