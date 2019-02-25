import React, { Component } from 'react';
import Axios from 'axios';

class Login extends Component {

    constructor(){
        super();
        this.submit = this.submit.bind(this)
        this.emailChangeHandler = this.emailChangeHandler.bind(this)
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this)

        this.state = {
            email: '',
            password: ''
        }
    }

    emailChangeHandler(e) {
        this.setState({ email: e.target.value });
        console.log(this.state.email)
    }

    passwordChangeHandler(e) {
        this.setState({ password: e.target.value });
        console.log(this.state.password)
    }

    submit(e){
        e.preventDefault();

        Axios({
            method: 'POST',
            url: '/users/sign_in',
            data: {
                user: {
                    email: this.state.email,
                    password: this.state.password
                }
            }
        })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    render() {
        return (
            <form
                onSubmit={ e => { this.submit(e) }} 
            >
                <input
                    name="email"
                    placeholder="Email"
                    onChange={this.emailChangeHandler}
                />
                <input
                    name="password"
                    placeholder="Password"
                    onChange={this.passwordChangeHandler}
                />
                <input
                    type="submit"
                    value="Submit"
                />
            </form>
            
        );
    }
}

export default Login;
