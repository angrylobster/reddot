class CreateCommentVotes < ActiveRecord::Migration[5.2]
  def change
    create_table :comment_votes do |t|
      t.integer :vote
      t.references :user
      t.references :comment
      t.timestamps
    end
  end
end
