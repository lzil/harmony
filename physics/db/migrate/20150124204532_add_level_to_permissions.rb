class AddLevelToPermissions < ActiveRecord::Migration
  def change
    add_column :permissions, :level, :string
  end
end
