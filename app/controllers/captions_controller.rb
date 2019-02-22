class CaptionsController < ApplicationController
  before_action :set_caption, only: [:show, :edit, :update, :destroy]

  # GET /captions
  # GET /captions.json
  def index
    @captions = Caption.all
    render json: @captions
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

    @caption = Caption.new(jsonHash)

    respond_to do |format|
      if @caption.save
        format.html { redirect_to @caption, notice: 'Caption was successfully created.' }
        format.json { render :show, status: :created, location: @caption }
      else
        format.html { render :new }
        format.json { render json: @caption.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /captions/1
  # PATCH/PUT /captions/1.json
  def update
    respond_to do |format|
      if @caption.update(caption_params)
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
