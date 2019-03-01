import React, { Component } from 'react';
import Main from './components/main';
import Activity from './components/activity';
import Navbar from './components/navbar';
import LoginModal from './components/loginModal';
import Axios from 'axios';
import './App.css';
import RegistrationModal from './components/registrationModal';

class App extends Component {
    
    constructor(){
        super();
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.register = this.register.bind(this);

        this.setCurrentUser = this.setCurrentUser.bind(this);
        this.setLatestPost = this.setLatestPost.bind(this);

        this.state = {
            loginError: '',
            showLoginModal: false,
            registrationError: '',
            currentUser: null,
            currentPost: { img: "https://upload.wikimedia.org/wikipedia/commons/d/d2/Solid_white.png" } //Default White Image
        }
    }

    componentDidMount(){
        this.setCurrentUser();
        this.setLatestPost();
    }

    setCurrentUser(){
        Axios({
            method: 'GET',
            url: '/users/get_current_user',
        })
        .then(response =>{
            this.setState({ currentUser: response.data })
        })
        .catch(error => {
            console.log(error)
        });
    }

    setCurrentPost(post) {
        this.setState({ currentPost: post })
    }

    setLatestPost() {
        Axios({
            method: 'GET',
            url: '/post/latest',
        })
        .then(response => {
            this.setState({ currentPost: response.data })
        })
        .catch(error => {
            console.log(error)
        });
    }

    logout(e){
        e.preventDefault();
        Axios({
            method: 'DELETE',
            url: '/users/sign_out',
        })
        .then(response => {
            this.setState({ currentUser: null })
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
            const modal = document.getElementById('login-modal');
            modal.classList.remove('show');
            modal.setAttribute('aria-hidden', 'true');
            modal.setAttribute('style', 'display: none');
            document.getElementsByClassName('modal-backdrop')[0].remove();
            this.setState({ currentUser: response.data });
        })
        .catch(error => {
            this.setState({ loginError: 'Invalid username or password!' })
        });
    }

    register(e, email, password){
        e.preventDefault();
        Axios({
            method: 'POST',
            url: '/users',
            data: {
                user: {
                    email: email,
                    password: password
                }
            }
        })
        .then(response => {
            const modal = document.getElementById('registration-modal');
            modal.classList.remove('show');
            modal.setAttribute('aria-hidden', 'true');
            modal.setAttribute('style', 'display: none');
            document.getElementsByClassName('modal-backdrop')[0].remove();
            this.setState({ currentUser: response.data });
        })
        .catch(error => {
            console.log('Registration error: ', error);
            this.setState({ registrationError: 'Something went wrong!' })
        })
    }

    render() {
        return (
            <React.Fragment>
                <Navbar
                    currentUser={ this.state.currentUser }  
                    logout={ this.logout }        
                />
                <RegistrationModal register={ this.register } />
                <LoginModal/>
                <div className="App">
                    <Main
                        currentUser={ this.state.currentUser }
                        currentPost={ this.state.currentPost }
                    />
                    <Activity/>
                </div>
            </React.Fragment>
        );
    }
}

export default App;
