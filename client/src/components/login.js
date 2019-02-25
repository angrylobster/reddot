import React, { Component } from 'react';
import Axios from 'axios';

class Login extends Component {

    constructor(){
        super();
        this.submit = this.submit.bind(this)
    }

    submit(e){
        e.preventDefault();

        Axios({
            method: 'POST',
            url: '/users/sign_in',
            data: {
                user: {
                    email: 'dario@yahoo.com',
                    password: 'ReddotSG'
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
                />
                <input
                    name="password"
                    placeholder="Password"
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
