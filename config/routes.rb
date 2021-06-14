Rails.application.routes.draw do
  resources :simulations
  get "about", to: "pages#about"
  root to: "simulations#new"
end
