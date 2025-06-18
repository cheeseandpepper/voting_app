# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end


puts "Creating 10 users..."

10.times do |i|
  email = "user#{i}@example.com"
  password = "password123"
  zip_code = i.to_s * 5
  
  User.find_or_create_by!(email: email) do |user|
    user.password = password
    user.zip_code = zip_code
    puts "Created user: #{email}, password: #{password}, zip_code: #{zip_code}"
  end
end

puts "Seed data creation completed!"
