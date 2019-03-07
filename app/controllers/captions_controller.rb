class CaptionsController < ApplicationController
  before_action :set_caption, only: [:show, :edit, :update, :destroy]

  # GET /captions
  # GET /captions.json
  def index
    @captions = Post.last.captions.all.left_outer_joins(:user).distinct.select('captions.*', 'users.name').map do |caption|
      caption.modify
    end
    render json: @captions
  end

  def activity #All types of activities. For recent activity.
    @activities = Array.new

    Caption.select('captions.*', 'users.name').joins(:user).find_each(start: Caption.all.count-10, finish: Caption.all.count) do |caption|
      @activities.push(caption)
    end
    Comment.select('comments.*', 'users.name').joins(:user).find_each(start: Comment.all.count-10, finish: Comment.all.count) do |comment|
      @activities.push(comment)
    end
    CaptionVote.select('caption_votes.*', 'users.name').joins(:user).find_each(start: CaptionVote.all.count-10, finish: CaptionVote.all.count) do |captionVote|
      @activities.push(captionVote)
    end
    CommentVote.select('comment_votes.*', 'users.name').joins(:user).find_each(start: CommentVote.all.count-10, finish: CommentVote.all.count) do |commentVote|
      @activities.push(commentVote)
    end

    render json: @activities
  end

  # GET /captions/1
  # GET /captions/1.json
  def show
  end

  # GET /captions/new
  def new
    @caption = Caption.new
  end

  # GET /captions/1/edit
  def edit
  end

  # POST /captions
  # POST /captions.json
  def create
    jsonString = request.body.read
    jsonHash = JSON.parse(jsonString)
    jsonHash['user_id'] = current_user.id
    @caption = Caption.new(jsonHash)
    # respond_to do |format|
      if @caption.save
        puts "OK SAVED"
        # format.html { redirect_to @caption, notice: 'Caption was successfully created.' }
        # format.json { render :show, status: :created, location: @caption }
        render json: {"caption": @caption}, status: 200
      else
        puts "NOT SAVED"
        # format.html { render :new }
        # format.json { render json: @caption.errors, status: :unprocessable_entity }
        render json: {"errors": @caption.errors}, status: 401
      end
    # end
  end

  # PATCH/PUT /captions/1
  # PATCH/PUT /captions/1.json
  def update
    jsonString = request.body.read
    jsonHash = JSON.parse(jsonString)
    @caption = Caption.where(id: request.params["id"])
    
    respond_to do |format|
      if @caption.update(jsonHash)
        format.html { redirect_to @caption, notice: 'Caption was successfully updated.' }
        format.json { render :show, status: :ok, location: @caption }
      else
        format.html { render :edit }
        format.json { render json: @caption.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /captions/1
  # DELETE /captions/1.json
  def destroy
    @caption.destroy
    respond_to do |format|
      format.html { redirect_to captions_url, notice: 'Caption was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_caption
      @caption = Caption.find(params[:id])
    end


    # Never trust parameters from the scary internet, only allow the white list through.
    # def caption_params
    #   jsonString = request.body.read
    #   jsonHash = JSON.parse(jsonString)
    #   byebug
    #   params.require(:caption).permit(:body)
    # end
end
