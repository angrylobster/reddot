Rails.application.routes.draw do
  resources :caption_votes
  resources :comment_votes
  devise_for :users
  resources :comments
  resources :captions
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
