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
        this.setCurrentPost = this.setCurrentPost.bind(this);
        this.getLatestPost = this.getLatestPost.bind(this);
        this.state = {
            error: null,
            currentUser: null,
            currentPost: {img: "https://upload.wikimedia.org/wikipedia/commons/d/d2/Solid_white.png"} //Default White Image
        }
    }

    componentDidMount(){
        this.getLatestPost()
        setInterval(this.getLatestPost, 3000)
    }

    getLatestPost() {
        Axios({
            method: 'GET',
            url: '/post/latest',
        })
        .then(response => {
            this.setState({currentPost: response.data.post})

             console.log("New STATE:", this.state.currentPost)
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
                    currentImg={ this.state.currentImg }
                    winningCaption={ this.state.winningCaption }
                    setCurrentPost={ this.setCurrentPost }          
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
                        currentPost={ this.state.currentPost }
                    />
                    <Activity/>
                </div>
            </React.Fragment>
        );
    }
}

export default App;
