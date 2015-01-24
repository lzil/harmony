class RemoveOwnerIdFromProjects < ActiveRecord::Migration
  def change
    remove_column :projects, :owner_id, :integer
  end
end
