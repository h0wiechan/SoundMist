Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root "static_pages#root"

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:index, :show, :create]
    resource :session, only: [:create, :destroy]
    resources :songs, only: [:index, :show, :create, :update, :destroy]
    resources :likes, only: [:index, :create, :destroy]
    resources :follows, only: [:index, :create, :destroy]
    resources :comments, only: [:index, :create, :destroy]
  end
end
