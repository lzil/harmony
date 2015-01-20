class User < ActiveRecord::Base
  before_save { self.email = email.downcase }
  validates :username, presence: true, length: { maximum: 20 }, uniqueness: {case_sensitive: false}
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
