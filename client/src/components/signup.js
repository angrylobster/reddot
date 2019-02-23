import React, { Component } from 'react';

class Signup extends Component {
  constructor(){
    super();
    this.signUp = this.signUp.bind(this);
    this.inputChange = this.inputChange.bind(this);

    this.state = {
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    }
  }

  inputChange(ev) {
    this.setState({'${ev.target.name}':ev.target.value});

    console.log(ev.target.name, ev.target.value);

    console.log(this.state.name, this.state.email, this.state.password);
  }

  signUp() {
    fetch('/users', {
        method: 'POST',
        header: {
            'Accept': 'application/json',
            'content-type': 'application/json'
        },
        body: JSON.stringify({
          name: this.state.name,
          email: this.state.email,
          password: this.state.password,
          password_confirmation: this.state.password_confirmation
        })
        
    }).then(response => {
        if (response.ok) { return response.json() } throw new Error('Request failed!');
    }, networkError => {
        console.log(networkError.message);
    }).then(jsonResponse => {
        return jsonResponse;
    });
  }

  render() {
    return (
        <form>
              <input type='text'
                name='name'
                placeholder='name'
                value={this.state.name}
                onChange={this.inputChange} />
 
              <input type='email'
                name='email'
                placeholder='email'
                value={this.state.email}
                onChange={this.inputChange} />
 
              <input type='password'
                name='password'
                placeholder='password'
                value={this.state.password}
                onChange={this.inputChange} />
 
              <input type='password'
                name='password_confirmation'
                placeholder='re-type password'
                value={this.state.password_confirmation}
                onChange={this.inputChange} />
            <input onClick={this.signUp} defaultValue="sign up"/>
          </form>
      
    );
  }
}

export default Signup;