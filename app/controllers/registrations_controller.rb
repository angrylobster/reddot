class RegistrationsController < Devise::RegistrationsController
    respond_to :json
 
    def create
      build_resource(sign_up_params)
      if resource.save
        render_resource(resource)
      else
        render :json => {error: resource.errors}, status: 401
      end
    end

    def sign_up_params
      params.require(:user).permit(:name, :email, :password, :password_confirmation)
    end
end