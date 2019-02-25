import React, { Component } from 'react';
import Axios from 'axios';

class Login extends Component {

    constructor(){
        super();
        this.submit = this.submit.bind(this);
        this.trackEmail = this.trackEmail.bind(this);
        this.trackPassword = this.trackPassword.bind(this);
        this.state = {
            email: "",
            password: ""
        }
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
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        });
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
                onSubmit={ e => { this.submit(e) }} 
            >
                <input
                    name="email"
                    placeholder="Email"
                    onChange={ this.trackEmail }
                />
                <input
                    name="password"
                    placeholder="Password"
                    onChange={ this.trackPassword }
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
