class CreateHands < ActiveRecord::Migration[6.0]
  def change
    create_table :hands do |t|
      t.string     :hand,    null: false
      t.references :status,  foreign_key: true
      t.timestamps
    end
  end
end
