import React, { Component } from 'react';

class Register extends Component {

    constructor(){
        super();
        // this.doLogin = this.doLogin.bind(this)
        this.state = {
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

    changeHandler(e){
        this.setState({
            [e.target.name]: e.target.value 
        })
    }

    render() {
        return (
            <form
                // onSubmit={ e => { this.doLogin(e) }} 
                id="registration-form"
            >
                <div className="form-group">
                    {/* { this.props.loginError ? this.getLoginErrorDiv() : null } */}
                    <label htmlFor="registration-email">Email address</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        id="registration-email" 
                        name="email" 
                        aria-describedby="emailHelp" 
                        placeholder="Enter email"
                        onChange={this.emailChangeHandler}
                        autoComplete="on"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="registration-password">Password</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        id="registration-password" 
                        name="password" 
                        placeholder="Password"
                        onChange={this.passwordChangeHandler}
                        autoComplete="on"
                    />
                </div>                
                <div className="form-group">
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        id="confirm-password" 
                        name="confirmPassword" 
                        placeholder="Confirm Password"
                        onChange={this.passwordChangeHandler}
                        autoComplete="off"
                    />
                </div>
                <button 
                    type="submit" 
                    className="btn btn-primary"
                >
                    Register
                </button>
            </form>     
        );
    }
}

export default Register;
