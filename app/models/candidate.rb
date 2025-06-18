class Candidate < ApplicationRecord
  has_many :votes
  
  validates :full_name, presence: true
end
