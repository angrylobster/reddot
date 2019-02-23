import React, { Component } from 'react';
const axios = require('axios');

class Signup extends Component {
  constructor(){
    super();
    this.signUp = this.signUp.bind(this);
  }

  signUp() {
    let name = document.querySelector('#root > div > div > form > input[type="text"]:nth-child(1)').value;
    let email = document.querySelector('#root > div > div > form > input[type="email"]:nth-child(2)').value;
    let password = document.querySelector('#root > div > div > form > input[type="password"]:nth-child(3)').value;
    let password_confirmation = document.querySelector('#root > div > div > form > input[type="password"]:nth-child(4)').value;

    axios.post('/users', {
      name: name,
      email: email,
      password: password,
      password_confirmation: password_confirmation
    })
    .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      console.log(error)
    });
    // fetch('/users', {
    //     method: 'POST',
    //     header: {
    //         'Accept': 'application/json',
    //         'content-type': 'application/json'
    //     },
    //     body: JSON.stringify({
          // name: name,
          // email: email,
          // password: password,
          // password_confirmation: password_confirmation
    //     })
        
    // }).then(async response => {
    //     let res = await response;
    //     debugger
    //     if (response.ok) { console.log(response.json()); return response.json(); } throw new Error('Request failed!');
    // }, networkError => {
    //     console.log(networkError.message);
    // }).then(jsonResponse => {
    //     return jsonResponse;
    // });
  }

  render() {
    return (
        <form>
              <input type='text'
                name='name'
                placeholder='name'/>
 
              <input type='email'
                name='email'
                placeholder='email' />
 
              <input type='password'
                name='password'
                placeholder='password' />
 
              <input type='password'
                name='password_confirmation'
                placeholder='re-type password' />
            <input onClick={this.signUp} defaultValue="sign up"/>
          </form>
      
    );
  }
}

export default Signup;