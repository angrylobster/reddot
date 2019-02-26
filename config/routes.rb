Rails.application.routes.draw do
  get '/activity', to: 'captions#activity'
  post '/post', to: 'post#store'

  resources :caption_votes
  resources :comment_votes
  devise_for :users, controllers: { sessions: 'sessions', registrations: 'registrations' }
  resources :comments
  resources :captions
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
