class SessionsController < Devise::SessionsController
    respond_to :json

    def create
        super
        session[:user_id] = current_user.id
    end

    def get_current_user
        render json: current_user
    end

    private
    def respond_with(resource, opts = {})
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