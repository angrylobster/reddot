class Comment < ApplicationRecord
  belongs_to :caption
  belongs_to :user
  has_many :comment_votes
end
