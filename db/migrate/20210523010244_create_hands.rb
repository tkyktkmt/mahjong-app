class CreateHands < ActiveRecord::Migration[6.0]
  def change
    create_table :hands do |t|
      # t.integer     :pai1
      # t.integer     :pai2
      # t.integer     :pai3
      # t.integer     :pai4
      # t.integer     :pai5
      # t.integer     :pai6
      # t.integer     :pai7
      # t.integer     :pai8
      # t.integer     :pai9
      # t.integer     :pai10
      # t.integer     :pai11
      # t.integer     :pai12
      # t.integer     :pai13
      # t.integer     :pai14
      # t.integer     :huro1
      # t.integer     :huro2
      # t.integer     :huro3
      # t.integer     :huro4
      # t.integer     :huro5
      # t.integer     :huro6
      # t.integer     :huro7
      # t.integer     :huro8
      # t.integer     :huro9
      # t.integer     :huro10
      # t.integer     :huro11
      # t.integer     :huro12
      t.references :status,  foreign_key: true
      t.timestamps
    end
  end
end
