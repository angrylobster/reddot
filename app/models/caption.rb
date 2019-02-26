class Caption < ApplicationRecord
  belongs_to :user
  has_many :comments
  has_many :caption_votes

  def modify
    result = {
      :id => self.id,
      :name => self.name,
      :caption_text => self.caption,
      :caption_votes => self.caption_votes,
      :total_votes => self.total_votes,
      :created_at => self.created_at,
      :updated_at => self.updated_at,
    }
    result[:comments] = self.get_comments
    return result
  end

  def get_comments
    result = []
    self.comments.map do |comment|
      hash = {}
      hash[:id] = comment.id
      hash[:comment_text] = comment.comment
      hash[:comment_votes] = comment.total_votes
      hash[:poster_id] = comment.user_id
      hash[:created_at] = comment.created_at
      hash[:updated_at] = comment.updated_at
      result.push(hash)
    end
    return result
  end

end
