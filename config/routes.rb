Rails.application.routes.draw do
  root 'omdb#index'
  get '/movie/:id' => 'omdb#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  get '/search/:title' => 'omdb#show_search_results'
  get '/search/movie/:id' => 'omdb#show_movie'
end
