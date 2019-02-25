import React, { Component } from 'react';
import Main from './components/main';
import Activity from './components/activity';
import Navbar from './components/navbar';
import Modal from './components/modal';
import Axios from 'axios';
import './App.css';

class App extends Component {
    
    constructor(){
        super();
        this.login = this.login.bind(this);
        this.state = {
            error: ''
        }
    }
    
    login(e, email, password){
        e.preventDefault();
        Axios({
            method: 'POST',
            url: '/users/sign_in',
            data: {
                user: {
                    email: email,
                    password: password
                }
            }
        })
        .then(response => {
            console.log(response);
            const modal = document.querySelector('#exampleModal');
            modal.classList.remove('show');
            modal.setAttribute('aria-hidden', 'true');
            modal.setAttribute('style', 'display: none');
            const modalBackdrops = document.getElementsByClassName('modal-backdrop');
            document.body.removeChild(modalBackdrops[0]);
        })
        .catch(error => {
            this.setState({
                error: 'Invalid username or password!'
            })
        });
    }

    render() {
        return (
            <React.Fragment>
                <Navbar/>
                <Modal
                    error={ this.state.error }
                    login={ this.login }
                />
                <div className="App">
                    <Main/>
                    <Activity/>
                </div>
            </React.Fragment>
        );
    }
}

export default App;
