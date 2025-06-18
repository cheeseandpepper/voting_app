class Vote < ApplicationRecord
  belongs_to :user
  belongs_to :candidate
  
  validates :user_id, presence: true, uniqueness: true
  
  accepts_nested_attributes_for :candidate
end
