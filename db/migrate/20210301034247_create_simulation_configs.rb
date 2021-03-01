class CreateSimulationConfigs < ActiveRecord::Migration[6.1]
  def change
    create_table :simulation_configs do |t|
      t.string :simulation_key
      t.text :simulation_params
      t.text :completed_simulation

      t.timestamps

      t.index :simulation_key
    end
  end
end
