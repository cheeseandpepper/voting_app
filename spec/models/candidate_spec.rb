require 'rails_helper'

RSpec.describe Candidate, type: :model do
  describe 'associations' do
    it { should have_many(:votes) }
  end

  describe 'database constraints' do
    it { should validate_presence_of(:full_name) }
  end
end
