Rails.application.routes.draw do
  root to: "statuses#index"
  resources :statuses, only: [:index, :new]
  resources :hands, only: :new
end
