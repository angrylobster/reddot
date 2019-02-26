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
        this.logout = this.logout.bind(this);
        this.setCurrentUser = this.setCurrentUser.bind(this);
        this.state = {
            error: null,
            currentUser: null
        }
    }

    setCurrentUser(user){
        this.setState({
            currentUser: user
        })
    }

    logout(e){
        e.preventDefault();
        Axios({
            method: 'DELETE',
            url: '/users/sign_out',
        })
        .then(response => {
            console.log(response)
            this.setState({
                currentUser: null
            })
        })
        .catch(error => {
            console.log(error)
        })
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
            this.setCurrentUser(response.data);
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
                <Navbar
                    currentUser={ this.state.currentUser }  
                    logout={ this.logout }                  
                />
                <Modal
                    setCurrentUser={ this.setCurrentUser }
                    error={ this.state.error }
                    login={ this.login }
                />
                <div className="App">
                    <Main
                        setCurrentUser={ this.setCurrentUser }
                        currentUser={ this.state.currentUser }
                    />
                    <Activity/>
                </div>
            </React.Fragment>
        );
    }
}

export default App;
