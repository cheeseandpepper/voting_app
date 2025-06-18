FactoryBot.define do
  factory :vote do
    association :user
    association :candidate
  end
end 