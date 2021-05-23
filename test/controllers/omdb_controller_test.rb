require 'test_helper'

class OmdbControllerTest < ActionDispatch::IntegrationTest
  test 'should get index' do
    get omdb_index_url
    assert_response :success
  end
end
