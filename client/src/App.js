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
        this.setCurrentUser = this.setCurrentUser.bind(this);
        this.setCurrentPost = this.setCurrentPost.bind(this);
        this.getLatestPost = this.getLatestPost.bind(this);
        this.state = {
            loginError: null,
            currentUser: null,
            currentPost: {img: "https://upload.wikimedia.org/wikipedia/commons/d/d2/Solid_white.png"} //Default White Image
        }
    }

    componentDidMount(){
        this.getLatestPost();
        this.getCurrentUser();
        setInterval(this.getLatestPost, 3000)
    }

    getCurrentUser(){
        Axios({
            method: 'GET',
            url: '/users/get_current_user',
        })
        .then(response =>{
            console.log('response', response)
            this.setState({ currentUser: response })
        })
        .catch(error => {
            console.log(error)
        });
    }

    getLatestPost() {
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

    setCurrentPost(post) {
        this.setState({ currentPost: post })
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
            const modal = document.getElementById('login-modal');
            modal.classList.remove('show');
            modal.setAttribute('aria-hidden', 'true');
            modal.setAttribute('style', 'display: none');
            document.getElementsByClassName('modal-backdrop')[0].remove();
            this.setCurrentUser(response.data);
        })
        .catch(error => {
            console.log('Error', error)
            this.setState({
                loginError: 'Invalid username or password!'
            })
        });
    }

    register(e, email, password){
        e.preventDefault();
        Axios({
            method: 'POST',
            url: '/users/sign_up',
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
            this.setCurrentUser(response.data);
        })
        .catch(error => {
            console.log('Error', error)
            this.setState({
                loginError: 'Something went wrong!'
            })
        });
    }

    render() {
        return (
            <React.Fragment>
                <Navbar
                    currentUser={ this.state.currentUser }  
                    logout={ this.logout }        
                    currentImg={ this.state.currentImg }
                    winningCaption={ this.state.winningCaption }
                    setCurrentPost={ this.setCurrentPost }          
                />
                <LoginModal
                    loginError={ this.state.loginError }
                    login={ this.login }
                />
                <RegistrationModal
                />
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
