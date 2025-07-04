class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :email, null: false, unique: true
      t.string :password, null: false
      t.string :zip_code, null: false
      
      t.timestamps
    end

    add_index :users, :email, unique: true
  end
end
