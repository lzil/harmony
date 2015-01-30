class AddPermissionsTable < ActiveRecord::Migration
  def change
    create_table :permissions do |t|
      t.belongs_to :user, index: true
      t.belongs_to :project, index: true
    end
  end
end
