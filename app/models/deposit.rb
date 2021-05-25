class Deposit < ActiveHash::Base
  self.data = [
    { id: 1, name: '--' },
    { id: 2, name: '0' },
    { id: 3, name: '1000' },
    { id: 4, name: '2000' },
    { id: 5, name: '3000' },
    { id: 6, name: '4000' },
    { id: 7, name: '5000' },
    { id: 8, name: '6000' },
    { id: 9, name: '7000' },
    { id: 10, name: '8000' },
    { id: 11, name: '9000' },
    { id: 12, name: '10000' }
  ]

  include ActiveHash::Associations
  has_many :statuses

end