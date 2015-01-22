class Project < ActiveRecord::Base
  has_many :permissions
  has_many :users, through: :permissions

  validates :name, presence: true, length: { maximum: 20 }, uniqueness: {case_sensitive: false}
end