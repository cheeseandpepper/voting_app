class CreateCandidates < ActiveRecord::Migration[7.0]
  def change
    create_table :candidates do |t|
      t.string :full_name, null: false
      t.timestamps
    end
  end
end
