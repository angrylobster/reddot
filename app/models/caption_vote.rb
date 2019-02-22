class CaptionVote < ApplicationRecord
  belongs_to :user
  belongs_to :caption
end
