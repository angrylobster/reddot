class SessionsController < Devise::SessionsController
    respond_to :json

    def create
        super
        session[:user_id] = current_user.id
        p current_user
    end

    # def create
    #     resource = User.find_for_database_authentication(email: params[:user][:email])
    #     return invalid_login_attempt unless resource
    #     if resource.valid_password?(params[:user][:password])
    #         sign_in :user, resource
    #         redirect_to root_url
    #         return
    #     end
    #     invalid_login_attempt
    # end

    private
    def respond_with(resource, _opts = {})
        # p resource
        render json: resource
    end

    def respond_to_on_destroy
        head :no_content
    end

    # def invalid_login_attempt
    #     render :json => {"error" => "Invalid username or password"}, status: 401
    # end
end