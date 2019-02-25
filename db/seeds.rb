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

20.times do 
  Caption.create(
    body: Faker::Games::WorldOfWarcraft.quote,
    user_id: rand(1..5),
  )
end

40.times do
  Comment.create(
    body: Faker::Games::Overwatch.quote,
    user_id: rand(1..5),
    caption_id: rand(1..20)
  )
end

20.times do
  CommentVote.create(
    vote: rand(-1..1),
    comment_id: rand(1..10),
    user_id: rand(1..5)
  )
end

50.times do
  CaptionVote.create(
    vote: rand(-1..1),
    caption_id: rand(1..18),
    user_id: rand(1..5)
  )
end

Caption.all.each do |caption|
  CaptionVote.all.each do |vote|
    if caption.id.to_i == vote.caption_id.to_i
      caption.total_votes = caption.total_votes + vote.vote
      caption.save
    end
  end
end

Comment.all.each do |comment|
  CommentVote.all.each do |vote|
    if comment.id.to_i == vote.comment_id.to_i
      comment.total_votes = comment.total_votes + vote.vote
      comment.save
    end
  end
end