class Project < ActiveRecord::Base
  has_many :permissions
  has_many :users, through: :permissions

  validates :name, presence: true, length: { maximum: 25 }, uniqueness: {case_sensitive: false}
  validates :description, length: { maximum: 60 }
end