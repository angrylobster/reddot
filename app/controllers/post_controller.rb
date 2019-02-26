require 'nokogiri'
require 'open-uri'

class PostController < ApplicationController
  def store
    #Upload image to cloudinary
    # @Value = Cloudinary::Uploader.upload(params["img"])
    # @Post = Post.new({ :img => @Value['secure_url'] })
    # @Post.save

    # Fetch and parse HTML document
    doc = Nokogiri::HTML(open('http://film-grab.com/?random'))
    img = doc.css('img').attr('src').text
    cloudinaryReturn = Cloudinary::Uploader.upload(img)
    
    render json: {img: cloudinaryReturn['secure_url']}
    #After storing post.  Find a new image
    # render json: @Post
  end 
end
