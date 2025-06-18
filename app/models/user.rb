class User < ApplicationRecord
  has_one :vote
  
  validates :email, presence: true, uniqueness: true, 
            format: { with: URI::MailTo::EMAIL_REGEXP, message: "must be a valid email address" }
  validates :password, presence: true, length: { minimum: 6 }
  validates :zip_code, presence: true, 
            format: { with: /\A\d{5}\z/, message: "must be a 5-digit zip code" }
end
