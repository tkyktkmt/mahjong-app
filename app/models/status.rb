class Status < ApplicationRecord
  with_options presence: true do
    with_options format: { with: /\A[0-9]+\z/ },
                 numericality: { greater_than_or_equal_to: 0, less_than_or_equal_to: 100_000 } do
      validates :score_east
      validates :score_south     
      validates :score_west      
      validates :score_north     
    end
    with_options numericality: { other_than: 1 } do    
      validates :round_wind_id   
      validates :deposit_id      
      validates :stacking_bar_id 
    end
  end  
end
