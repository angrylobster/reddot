class Caption < ApplicationRecord
  belongs_to :user
  has_many :comments
  has_many :caption_votes
end
