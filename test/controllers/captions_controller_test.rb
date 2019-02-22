require 'test_helper'

class CaptionsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @caption = captions(:one)
  end

  test "should get index" do
    get captions_url
    assert_response :success
  end

  test "should get new" do
    get new_caption_url
    assert_response :success
  end

  test "should create caption" do
    assert_difference('Caption.count') do
      post captions_url, params: { caption: { body: @caption.body } }
    end

    assert_redirected_to caption_url(Caption.last)
  end

  test "should show caption" do
    get caption_url(@caption)
    assert_response :success
  end

  test "should get edit" do
    get edit_caption_url(@caption)
    assert_response :success
  end

  test "should update caption" do
    patch caption_url(@caption), params: { caption: { body: @caption.body } }
    assert_redirected_to caption_url(@caption)
  end

  test "should destroy caption" do
    assert_difference('Caption.count', -1) do
      delete caption_url(@caption)
    end

    assert_redirected_to captions_url
  end
end
