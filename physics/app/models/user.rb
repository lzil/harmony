class User < ActiveRecord::Base
  has_many :permissions
  has_many :projects, through: :permissions

  before_save { self.email = email.downcase }
  before_save { self.username = username.downcase }
  VALID_USERNAME_REGEX = /[0-9a-zA-Z_]+/
  validates :username, presence: true, length: { maximum: 20 }, format: {with: VALID_USERNAME_REGEX}, uniqueness: {case_sensitive: false}
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email, presence: true, length: { maximum: 40 }, format: {with: VALID_EMAIL_REGEX}, uniqueness: {case_sensitive: false }

  has_secure_password
  validates :password, length: { minimum: 6 }, allow_blank: true

  # Returns the hash digest of the given string.
  def User.digest(string)
    cost = ActiveModel::SecurePassword.min_cost ? BCrypt::Engine::MIN_COST :
                                                  BCrypt::Engine.cost
    BCrypt::Password.create(string, cost: cost)
  end
end
