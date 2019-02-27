class CaptionVotesController < ApplicationController
  before_action :set_caption_vote, only: [:show, :edit, :update, :destroy]

  # GET /caption_votes
  # GET /caption_votes.json
  def index
    @caption_votes = CaptionVote.all
    render json: @caption_votes
  end

  # GET /caption_votes/1
  # GET /caption_votes/1.json
  def show
  end

  # GET /caption_votes/new
  def new
    @caption_vote = CaptionVote.new
  end

  # GET /caption_votes/1/edit
  def edit
  end

  # POST /caption_votes
  # POST /caption_votes.json
  def create
    jsonString = request.body.read
    jsonHash = JSON.parse(jsonString)
    
    #CHECK IF VOTE EXIST. IF EXIST, EDIT Vote Integer. IF NOT, CREATE Vote.
    if CaptionVote.where(user_id: jsonHash['user_id'], caption_id: jsonHash['caption_id']).any?
      #Vote Entry Exist. Update Vote
      @caption_vote = CaptionVote.where(user_id: jsonHash['user_id'], caption_id: jsonHash['caption_id'])
      if @caption_vote.update(jsonHash)
        render json: @caption_vote
      else
        render json: @caption_vote.errors
      end
    else
      #Vote Entry Don't Exist. Create Vote
      @caption_vote = CaptionVote.new(jsonHash)
      if @caption_vote.save
        render json: @caption_vote
      else
        render json: @caption_vote.errors
      end
    end
  end

  # PATCH/PUT /caption_votes/1
  # PATCH/PUT /caption_votes/1.json
  def update
    respond_to do |format|
      if @caption_vote.update(caption_vote_params)
        format.html { redirect_to @caption_vote, notice: 'Caption vote was successfully updated.' }
        format.json { render :show, status: :ok, location: @caption_vote }
      else
        format.html { render :edit }
        format.json { render json: @caption_vote.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /caption_votes/1
  # DELETE /caption_votes/1.json
  def destroy
    @caption_vote.destroy
    respond_to do |format|
      format.html { redirect_to caption_votes_url, notice: 'Caption vote was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_caption_vote
      @caption_vote = CaptionVote.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def caption_vote_params
      params.require(:caption_vote).permit(:vote)
    end
end
