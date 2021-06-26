class CreateHands < ActiveRecord::Migration[6.0]
  def change
    create_table :hands do |t|
      t.text       :pai1
      t.text       :pai2
      t.text       :pai3
      t.text       :pai4
      t.text       :pai5
      t.text       :pai6
      t.text       :pai7
      t.text       :pai8
      t.text       :pai9
      t.text       :pai10
      t.text       :pai11
      t.text       :pai12
      t.text       :pai13
      t.text       :pai14
      t.text       :huro1_1 
      t.text       :huro1_2 
      t.text       :huro1_3 
      t.text       :huro2_1 
      t.text       :huro2_2 
      t.text       :huro2_3 
      t.text       :huro3_1 
      t.text       :huro3_2 
      t.text       :huro3_3 
      t.text       :huro4_1 
      t.text       :huro4_2 
      t.text       :huro4_3 
      t.text       :dora 
      t.references :status,  foreign_key: true
      t.timestamps
    end
  end
end
