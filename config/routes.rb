Rails.application.routes.draw do
  root 'omdb#index'
  get '/movie/:id' => 'omdb#index'
  get '/movies/:title' => 'omdb#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  get '/search/movies/:title' => 'omdb#show_search_results'
  get '/search/movie/:id' => 'omdb#show_movie'
  match '*path', to: 'omdb#index', via: :all
end
