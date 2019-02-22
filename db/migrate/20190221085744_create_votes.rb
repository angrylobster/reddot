class CreateVotes < ActiveRecord::Migration[5.2]
  def change
    create_table :votes do |t|
      t.integer :vote
      t.references :comment
      t.references :caption
      t.timestamps
    end
  end
end
