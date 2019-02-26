class PostController < ApplicationController
  def store
    #Upload image to cloudinary
    @Value = Cloudinary::Uploader.upload(params["img"])
    @Post = Post.new({ :img => @Value['secure_url'], :caption => params["caption"] })
    @Post.save

    render json: @Post
    #After storing post.  Find a new image
  end 
end
