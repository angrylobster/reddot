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
            loginError: ''
        }
    }

    emailChangeHandler(e) {
        this.setState({ email: e.target.value });
    }

    passwordChangeHandler(e) {
        this.setState({ password: e.target.value });
    }

    doLogin(e){
        e.preventDefault();
        this.props.login({
            email: this.state.email, 
            password: this.state.password
        });
    }

    componentDidUpdate(){
        if (this.state.loginError !== this.props.loginError){
            this.setState({ loginError: this.props.loginError })
        }
    }

    getLoginErrorDiv(){
        return (
            <small
                className="text-danger d-block"
                id="login-error"
            >
                { this.state.loginError }
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
                    { this.props.loginError ? this.getLoginErrorDiv() : null }
                    <label htmlFor="login-email">Email address</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        id="login-email" 
                        name="email" 
                        aria-describedby="emailHelp" 
                        placeholder="Enter email"
                        onChange={this.emailChangeHandler}
                        autoComplete="on"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="login-password">Password</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        id="login-password" 
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
