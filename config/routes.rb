Rails.application.routes.draw do
  root to: "statuses#index"
  resources :statuses, only: [:index, :new, :create] do
    resources :hands, only: [:new, :create, :show]
  end
end
