class EditProjectsTable < ActiveRecord::Migration
  def change
  	add_column :projects, :owner_id, :integer
  	add_column :projects, :public, :boolean
  end
end
