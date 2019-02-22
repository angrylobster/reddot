class Vote < ApplicationRecord
    belongs_to :comment
    belongs_to :user, through :captions
    belongs_to :user, through :comments
    belongs_to :caption
end
