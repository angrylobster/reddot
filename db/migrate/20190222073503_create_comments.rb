class CreateComments < ActiveRecord::Migration[5.2]
  def change
    create_table :comments do |t|
      t.text :comment
      t.references :user
      t.references :caption
      t.integer :total_votes, default: 0
      t.timestamps
    end
  end
end
