class Status < ApplicationRecord
  extend ActiveHash::Associations::ActiveRecordExtensions
  belongs_to :deposit
  belongs_to :stacking_bar
  belongs_to :round_wind
  has_many :hands

  with_options presence: true do
    with_options format: { with: /\A[0-9]+\z/ },
                 numericality: { greater_than_or_equal_to: 0, less_than_or_equal_to: 100_000 } do
      validates :score_east
      validates :score_south     
      validates :score_west      
      validates :score_north     
    end
    validates :round_wind_id   
    validates :deposit_id      
    validates :stacking_bar_id 
    validates :seat_wind
  end 
  validate :sum_of_score_and_deposit
  
  def sum_of_score_and_deposit
    if score_east.present? and score_south.present? and score_west.present? and score_north.present? and deposit_id.present?
      error_message = "Please make sum of score and deposit 100,000 "
      errors.add(:base, error_message) unless (score_east + score_south + score_west + score_north + deposit_id == 100000)
    end
  end
end
