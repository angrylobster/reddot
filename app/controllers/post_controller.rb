require 'nokogiri'
require 'open-uri'

class PostController < ApplicationController
  def retrieve
    @Post = Post.last
    render json: { currentImg: @Post }
  end

  def create
    ##Take Current Img And Winning Caption and post to Twitter/Instagram
    

    ##Generate new image for next post
    # Fetch and parse HTML document
    doc = Nokogiri::HTML(open('http://film-grab.com/?random'))
    img = doc.css('img').attr('src').text
    #Upload to Cloudinary
    cloudinaryReturn = Cloudinary::Uploader.upload(img)
    
    #Create and save new Post/Img into db
    @Post = Post.new({img: cloudinaryReturn['secure_url']})
    if @Post.save
      render json: { currentImg: @Post }
    else
      render json: @Post.errors
    end
  end 
end
