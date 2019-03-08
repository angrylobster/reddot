import React, { Component } from 'react';
import Content from './components/content';
import Activity from './components/activity';
import Navbar from './components/navbar';
import LoginModal from './components/loginModal';
import Axios from 'axios';
import './App.css';
import RegistrationModal from './components/registrationModal';

class App extends Component {
    constructor() {
        super();
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.register = this.register.bind(this);

        this.setCurrentUser = this.setCurrentUser.bind(this);
        this.setLatestPost = this.setLatestPost.bind(this);

        this.state = {
            loginError: '',
            registrationError: '',
            currentUser: null,
            currentPost: {
                img:
                    'https://upload.wikimedia.org/wikipedia/commons/d/d2/Solid_white.png',
            }, //Default White Image
        };
    }

    componentDidMount() {
        this.setCurrentUser();
        this.setLatestPost();
    }

    setCurrentUser() {
        Axios({
            method: 'GET',
            url: '/users/get_current_user',
        })
            .then(response => {
                this.setState({ currentUser: response.data });
            })
            .catch(error => {
                console.log(error);
            });
    }

    setLatestPost() {
        Axios({
            method: 'GET',
            url: '/post/latest',
        })
            .then(response => {
                this.setState({ currentPost: response.data });
            })
            .catch(error => {
                console.log(error);
            })
            .then(() => {
                this.setCurrentUser();
            });
    }

    logout(e) {
        e.preventDefault();
        Axios({
            method: 'DELETE',
            url: '/users/sign_out',
        })
            .then(response => {
                document.body.classList = "pt-5";
                document.body.removeAttribute('style');
                document.querySelector('nav').removeAttribute('style');
                this.setState({ currentUser: null });
            })
            .catch(error => {
                console.log(error);
            });
    }

    login(credentials) {
        Axios({
            method: 'POST',
            url: '/users/sign_in',
            data: {
                user: {
                    email: credentials.email,
                    password: credentials.password,
                },
            },
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
                console.log(error);
                this.setState({ loginError: 'Invalid username or password!' });
            });
    }

    register(credentials) {
        Axios({
            method: 'POST',
            url: '/users',
            data: {
                user: {
                    email: credentials.email,
                    name: credentials.name,
                    password: credentials.password,
                },
            },
        })
            .then(response => {
                console.log(response);
                const modal = document.getElementById('registration-modal');
                modal.classList.remove('show');
                modal.setAttribute('aria-hidden', 'true');
                modal.setAttribute('style', 'display: none');
                document.getElementsByClassName('modal-backdrop')[0].remove();
                this.setState({ currentUser: response.data });
            })
            .catch(error => {
                let errorObject = error.response.data.error;
                this.setState({
                    registrationError:
                        'Error: ' +
                        Object.keys(errorObject)[0] +
                        ' ' +
                        errorObject[Object.keys(errorObject)[0]],
                });
            });
    }

    render() {
        return (
            <>
                <Navbar
                    currentUser={this.state.currentUser}
                    logout={this.logout}
                />
                <RegistrationModal
                    register={this.register}
                    registrationError={this.state.registrationError}
                />
                <LoginModal
                    login={this.login}
                    loginError={this.state.loginError}
                />
                <div className="App">
                    <Content
                        currentUser={this.state.currentUser}
                        currentPost={this.state.currentPost}
                    />
                    <Activity />
                </div>
            </>
        );
    }
}

export default App;
