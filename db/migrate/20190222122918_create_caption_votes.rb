class CreateCaptionVotes < ActiveRecord::Migration[5.2]
  def change
    create_table :caption_votes do |t|
      t.integer :vote
      t.references :user
      t.references :caption
      t.timestamps
    end
  end
end
