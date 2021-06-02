def random_wind
  cardinal_directions_array = ["東", "南", "西", "北"]
  cardinal_directions_array[rand(cardinal_directions_array.size)]
end
def random_score(score_array)
  score_max = 100000 - deposit_id
  3.times do 
    score = rand(0..score_max).round(-2)
    score_array << score
    score_max -= score
  end
  score_array << score_max
end
score_array = []
FactoryBot.define do
  factory :status do  
    deposit_id {rand(0..10)*1000}   
    score_east   { random_score(score_array)[0] }
    score_south  { score_array[1] }
    score_west   { score_array[2] }
    score_north  { score_array[3] }
    seat_wind  { random_wind }
    round_wind_id { random_wind }
    stacking_bar_id {rand(0..10)}   
  end
end