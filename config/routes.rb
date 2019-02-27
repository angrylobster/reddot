Rails.application.routes.draw do
  resources :caption_votes
  resources :comment_votes
  devise_for :users, controllers: { sessions: 'sessions', registrations: 'registrations' }
  resources :comments
  resources :captions
  
  get '/activity', to: 'captions#activity'
  get '/post', to: 'post#index'
  get '/post/latest', to: 'post#latest'
  
  devise_scope :user do
    get '/users/get_current_user', to: 'sessions#get_current_user'
  end
  
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
