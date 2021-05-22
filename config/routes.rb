Rails.application.routes.draw do
  get 'statuses/index'
  root to: "statuses#index"
  resources :statuses, only: [:index, :new]
end
