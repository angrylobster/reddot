class CreateCaptions < ActiveRecord::Migration[5.2]
  def change
    create_table :captions do |t|
      t.text :body
      t.references :user
      t.integer :total_votes, default: 0
      t.timestamps
    end
  end
end
