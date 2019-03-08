class CommentVotesController < ApplicationController
  before_action :set_comment_vote, only: [:show, :edit, :update, :destroy]

  # GET /comment_votes
  # GET /comment_votes.json
  def index
    @comment_votes = CommentVote.all
    render json: @comment_votes
  end

  # GET /comment_votes/1
  # GET /comment_votes/1.json
  def show
  end

  # GET /comment_votes/new
  def new
    @comment_vote = CommentVote.new
  end

  # GET /comment_votes/1/edit
  def edit
  end

  # POST /comment_votes
  # POST /comment_votes.json
  def create
    jsonString = request.body.read
    jsonHash = JSON.parse(jsonString)
    #CHECK IF VOTE EXIST. IF EXIST, EDIT Vote Integer. IF NOT, CREATE Vote.
    if CommentVote.where(user_id: jsonHash['user_id'], comment_id: jsonHash['comment_id']).any?
      #Vote Entry Exist. Update Vote
      @comment = Comment.where(caption_id: jsonHash['caption_id'], user_id: jsonHash['poster_id'])
      p @comment
      @comment_vote = CommentVote.where(user_id: jsonHash['user_id'], comment_id: jsonHash['comment_id'])
      p @comment_vote
      if @comment_vote.update(vote: jsonHash["vote"])
        render json: {comment_vote: @comment_vote, total_votes: total_votes(jsonHash['comment_id'])}, status: 200
      else
        render json: {'error': @comment_vote.errors}, status: 401
      end
    else
      #Vote Entry Don't Exist. Create Vote
      @comment_vote = CommentVote.new(jsonHash.slice('vote', 'user_id', 'comment_id'))
      p @comment_vote
      if @comment_vote.save
        render json: {comment_vote: @comment_vote, total_votes: total_votes(jsonHash['comment_id'])}, status: 200
        else
        render json: {'error': @comment_vote.errors}, status: 401
      end
    end
  end

  # PATCH/PUT /comment_votes/1
  # PATCH/PUT /comment_votes/1.json
  def update
    respond_to do |format|
      if @comment_vote.update(comment_vote_params)
        format.html { redirect_to @comment_vote, notice: 'Comment vote was successfully updated.' }
        format.json { render :show, status: :ok, location: @comment_vote }
      else
        format.html { render :edit }
        format.json { render json: @comment_vote.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /comment_votes/1
  # DELETE /comment_votes/1.json
  def destroy
    @comment_vote.destroy
    respond_to do |format|
      format.html { redirect_to comment_votes_url, notice: 'Comment vote was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_comment_vote
      @comment_vote = CommentVote.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def comment_vote_params
      params.require(:comment_vote).permit(:vote)
    end

    def total_votes(comment_id)
      total = 0
      votes_on_comment = CommentVote.where(comment_id: comment_id)
      votes_on_comment.each do |vote|
        total = total + vote.vote
      end
      @comment = Comment.where(id: comment_id)
      @comment.update(total_votes: total)
      return total
    end
end
