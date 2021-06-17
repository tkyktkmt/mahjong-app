class Hand < ApplicationRecord
  belongs_to :status
  has_one_attached :image

end
