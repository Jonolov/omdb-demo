# frozen_string_literal: true

require 'uri'
require 'net/http'

# Controller that handles http requests to the omdb api
class OmdbController < ApplicationController
  def index; end

  def show_search_results
    @movies = find_movies(params[:title])
    render json: @movies
  end

  def show_movie
    @movie = get_movie(params[:id])
    render json: @movie
  end

  def find_movies(movie_title)
    uri = URI('http://www.omdbapi.com/')
    params = { apikey: ENV['OMDB_API_KEY'], s: movie_title } # The api key is placed in .env
    uri.query = URI.encode_www_form(params)
    response = Net::HTTP.get_response(uri)

    raise HttpError.new(response.code, response.message) if response.code != '200'

    response.body
  end

  def get_movie(imdb_id)
    uri = URI('http://www.omdbapi.com/')
    params = { apikey: ENV['OMDB_API_KEY'], i: imdb_id }
    uri.query = URI.encode_www_form(params)
    res = Net::HTTP.get_response(uri)

    raise HttpError.new(response.code, response.message) if response.code != '200'

    res.body
  end
end
