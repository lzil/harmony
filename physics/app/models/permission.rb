class Permission < ActiveRecord::Base
  belongs_to :projects
  belongs_to :users
end
