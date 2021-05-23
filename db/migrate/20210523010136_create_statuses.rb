class CreateStatuses < ActiveRecord::Migration[6.0]
  def change
    create_table :statuses do |t|
      t.integer    :score_east,      null: false
      t.integer    :score_south,     null: false
      t.integer    :score_west,      null: false
      t.integer    :score_north,     null: false
      t.integer    :seat_wind_id,    null: false
      t.integer    :round_wind_id,   null: false
      t.integer    :deposit_id,      null: false
      t.integer    :stacking_bar_id, null: false
      t.timestamps
    end
  end
end
