import React, { Component } from 'react';

class Login extends Component {

    constructor(){
        super();
        this.doLogin = this.doLogin.bind(this)
        this.emailChangeHandler = this.emailChangeHandler.bind(this)
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this)

        this.state = {
            email: '',
            password: '',
            error: ''
        }
    }

    emailChangeHandler(e) {
        this.setState({ email: e.target.value });
    }

    passwordChangeHandler(e) {
        this.setState({ password: e.target.value });
    }

    doLogin(e){
        this.props.login(e, this.state.email, this.state.password);
    }

    getLoginErrorDiv(){
        return (
            <small
                className="text-danger d-block"
                id="login-error"
            >
                { this.props.error }
            </small>
        )
    }

    trackEmail(e){
        this.setState({
            email: e.target.value
        })
    }

    trackPassword(e){
        this.setState({
            password: e.target.value
        })
    }

    render() {
        return (
            <form
                onSubmit={ e => { this.doLogin(e) }} 
                id="login-form"
            >
                <div className="form-group">
                    { this.props.error ? this.getLoginErrorDiv() : null }
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        id="exampleInputEmail1" 
                        name="email" 
                        aria-describedby="emailHelp" 
                        placeholder="Enter email"
                        onChange={this.emailChangeHandler}
                        autoComplete="on"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        id="exampleInputPassword1" 
                        name="password" 
                        placeholder="Password"
                        onChange={this.passwordChangeHandler}
                        autoComplete="on"
                    />
                </div>
                <button 
                    type="submit" 
                    className="btn btn-primary"
                >
                    Submit
                </button>
            </form>     
        );
    }
}

export default Login;
