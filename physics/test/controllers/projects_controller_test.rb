require 'test_helper'

class ProjectsControllerTest < ActionController::TestCase
  test "should get default" do
    get :default
    assert_response :success
  end

end
