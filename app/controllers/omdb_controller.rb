# frozen_string_literal: true

require 'uri'
require 'net/http'

# Controller that handles http requests to the omdb api
class OmdbController < ApplicationController
  def index; end

  def show_search_results
    movies = find_movies(params[:title])
  end

  def show_movie
    movie = get_movie(params[:id])
  end

  def find_movies(movie_title)
    uri = URI('http://www.omdbapi.com/')
    params = { apikey: ENV['OMDB_API_KEY'], s: movie_title } # The api key is placed in .env
    uri.query = URI.encode_www_form(params)
    res = Net::HTTP.get_response(uri)
    render json: res.body
  end

  def get_movie(imdb_id)
    logger.debug "The id: #{imdb_id}"
    uri = URI('http://www.omdbapi.com/')
    params = { apikey: ENV['OMDB_API_KEY'], i: imdb_id }
    uri.query = URI.encode_www_form(params)
    res = Net::HTTP.get_response(uri)
    render json: res.body
  end
end
