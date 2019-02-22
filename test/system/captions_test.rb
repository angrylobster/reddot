require "application_system_test_case"

class CaptionsTest < ApplicationSystemTestCase
  setup do
    @caption = captions(:one)
  end

  test "visiting the index" do
    visit captions_url
    assert_selector "h1", text: "Captions"
  end

  test "creating a Caption" do
    visit captions_url
    click_on "New Caption"

    fill_in "Body", with: @caption.body
    click_on "Create Caption"

    assert_text "Caption was successfully created"
    click_on "Back"
  end

  test "updating a Caption" do
    visit captions_url
    click_on "Edit", match: :first

    fill_in "Body", with: @caption.body
    click_on "Update Caption"

    assert_text "Caption was successfully updated"
    click_on "Back"
  end

  test "destroying a Caption" do
    visit captions_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Caption was successfully destroyed"
  end
end
