require 'rails_helper'

RSpec.describe User, type: :model do
  subject { build(:user) }

  describe 'associations' do
    it { should have_one(:vote) }
  end

  describe 'database constraints' do
    it { should validate_presence_of(:email) }
    it { should validate_presence_of(:password) }
    it { should validate_presence_of(:zip_code) }
    it { should validate_uniqueness_of(:email) }
  end
end
