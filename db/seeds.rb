# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

5.times do
  User.create(
    name: "Liew " + Faker::Name.first_name,
    email: Faker::Internet.free_email,
    password: "ReddotSG",
    password_confirmation: "ReddotSG"
  )
end

40.times do 
  Caption.create(
    body: Faker::Games::WorldOfWarcraft.quote,
    user_id: rand(1..5),
  )
end

20.times do
  Comment.create(
    body: Faker::Games::Overwatch.quote,
    user_id: rand(1..5),
    caption_id: rand(1..20)
  )
end

20.times do
  CommentVote.create(
    vote: rand(1..2),
    comment_id: rand(1..10),
    user_id: rand(1..5)
  )
end

20.times do
  CaptionVote.create(
    vote: rand(1..2),
    caption_id: rand(1..10),
    user_id: rand(1..5)
  )
end