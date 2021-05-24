class RoundWind < ActiveHash::Base
  self.data = [
    { id: 1, name: '--' },
    { id: 2, name: '東' },
    { id: 3, name: '南' },
    { id: 4, name: '西' }
  ]

  include ActiveHash::Associations
  has_many :statuses

end