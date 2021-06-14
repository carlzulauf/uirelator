class CreateSimulations < ActiveRecord::Migration[6.1]
  def change
    create_table :simulations do |t|
      t.string :key
      t.string :description
      t.text :params

      t.timestamps

      t.index :key
    end
  end
end
