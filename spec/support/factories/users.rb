FactoryBot.define do
  factory :user do
    email { Faker::Internet.unique.email }
    password { Faker::Internet.password }
    zip_code { Faker::Address.zip_code }
  end
end 