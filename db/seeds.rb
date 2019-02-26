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

1.times do
  Post.create(
    img: "https://res.cloudinary.com/dpe51lubf/image/upload/v1551172860/eoklbpu04fbf03cojvlu.jpgz"
  )
end

20.times do 
  Caption.create(
    caption: Faker::Games::WorldOfWarcraft.quote,
    user_id: rand(1..5),
    post_id: 1, #default
    total_votes: 0 #default
  )
end

40.times do
  Comment.create(
    comment: Faker::Games::Overwatch.quote,
    user_id: rand(1..5),
    caption_id: rand(1..20),
    total_votes: 0 #default
  )
end

def createCommentVote(vote, user_id, until_comment_id)
  @vote = vote
  @id = user_id
  until_comment_id.times do |index|
    CommentVote.create(
      vote: @vote,
      comment_id: index+1,
      user_id: @id
    )
  end
end

createCommentVote(1, 1, 10)
createCommentVote(-1, 2, 35)
createCommentVote(1, 3, 30)
createCommentVote(1, 4, 5)
createCommentVote(1, 5, 3)

def createCaptionVote(vote, user_id, until_caption_id)
  @vote = vote
  @id = user_id
  until_caption_id.times do |index|
    CaptionVote.create(
      vote: @vote,
      caption_id: index+1,
      user_id: @id
    )
  end
end

createCaptionVote(1, 1, 10)
createCaptionVote(-1, 2, 15)
createCaptionVote(1, 3, 15)
createCaptionVote(1, 4, 5)
createCaptionVote(1, 5, 3)


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