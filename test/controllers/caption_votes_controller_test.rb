require 'test_helper'

class CaptionVotesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @caption_vote = caption_votes(:one)
  end

  test "should get index" do
    get caption_votes_url
    assert_response :success
  end

  test "should get new" do
    get new_caption_vote_url
    assert_response :success
  end

  test "should create caption_vote" do
    assert_difference('CaptionVote.count') do
      post caption_votes_url, params: { caption_vote: { vote: @caption_vote.vote } }
    end

    assert_redirected_to caption_vote_url(CaptionVote.last)
  end

  test "should show caption_vote" do
    get caption_vote_url(@caption_vote)
    assert_response :success
  end

  test "should get edit" do
    get edit_caption_vote_url(@caption_vote)
    assert_response :success
  end

  test "should update caption_vote" do
    patch caption_vote_url(@caption_vote), params: { caption_vote: { vote: @caption_vote.vote } }
    assert_redirected_to caption_vote_url(@caption_vote)
  end

  test "should destroy caption_vote" do
    assert_difference('CaptionVote.count', -1) do
      delete caption_vote_url(@caption_vote)
    end

    assert_redirected_to caption_votes_url
  end
end
