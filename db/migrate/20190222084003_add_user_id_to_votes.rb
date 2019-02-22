class AddUserIdToVotes < ActiveRecord::Migration[5.2]
  def change
    add_column :votes, :user_id, :bigint
  end
end
