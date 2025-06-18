class Candidate < ApplicationRecord
  has_many :votes
  
  validates :full_name, presence: true, uniqueness: true, 
            length: { minimum: 2, maximum: 100 }
end
