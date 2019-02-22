require "application_system_test_case"

class CaptionVotesTest < ApplicationSystemTestCase
  setup do
    @caption_vote = caption_votes(:one)
  end

  test "visiting the index" do
    visit caption_votes_url
    assert_selector "h1", text: "Caption Votes"
  end

  test "creating a Caption vote" do
    visit caption_votes_url
    click_on "New Caption Vote"

    fill_in "Vote", with: @caption_vote.vote
    click_on "Create Caption vote"

    assert_text "Caption vote was successfully created"
    click_on "Back"
  end

  test "updating a Caption vote" do
    visit caption_votes_url
    click_on "Edit", match: :first

    fill_in "Vote", with: @caption_vote.vote
    click_on "Update Caption vote"

    assert_text "Caption vote was successfully updated"
    click_on "Back"
  end

  test "destroying a Caption vote" do
    visit caption_votes_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Caption vote was successfully destroyed"
  end
end
