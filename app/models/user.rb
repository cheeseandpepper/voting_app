class User < ApplicationRecord
  has_one :vote
  
  validates :email, presence: true, uniqueness: true
  validates :password, presence: true
  validates :zip_code, presence: true
end
