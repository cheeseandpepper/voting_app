require 'rails_helper'

RSpec.describe Vote, type: :model do
  subject { build(:vote) }

  describe 'associations' do
    it { should belong_to(:user) }
    it { should belong_to(:candidate) }
  end
end
