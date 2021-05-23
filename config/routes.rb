Rails.application.routes.draw do
  root to: "statuses#index"
  resources :statuses, only: [:index, :new, :create]
  resources :hands, only: [:new, :create, :show]
end
