import React, { Component } from 'react';
class Navbar extends Component{

    constructor(){
        super();
        this.state = {
            currentUser: null
        }
    }

    componentDidMount(){
        this.setState({ currentUser: this.props.currentUser });
    }

    componentDidUpdate(){
        if (!this.state.currentUser && this.props.currentUser){
            this.setState({ currentUser: this.props.currentUser });
        } else if (this.state.currentUser && !this.props.currentUser) {
            this.setState({ currentUser: null });
        }
    }

    getLoginOrLogoutButton(){
        if (!this.state.currentUser){
            return( 
                <button 
                    className="btn btn-outline-light float-right"
                    data-toggle="modal" 
                    data-target="#login-modal"
                >
                    Login
                </button>
            )
        } else {
            return (
                <button
                    className="btn btn-outline-light"
                    onClick={ e => { this.props.logout(e) }}                
                >
                    Logout
                </button>
            )
        }
    }

    getRegisterButton(){
        if (!this.state.currentUser){
            return (
                <button
                    className="btn btn-outline-light float-right ml-3"
                    data-toggle="modal" 
                    data-target="#registration-modal"
                >
                    Register
                </button>
            )
        }
    }
    
    render(){
        return (
            <nav className="navbar navbar-dark navbar-expand-sm bg-dark fixed-top text-white justify-content-end">
                <a className="navbar-brand" href="/">
                    <h3 className="m-0">
                        Reddot
                    </h3>
                </a>
                <button className="navbar-toggler ml-auto" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02"
                    aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse flex-grow-0 ml-auto" id="navbarTogglerDemo02">
                    { this.getLoginOrLogoutButton() }
                    { this.getRegisterButton() }
                </div>
            </nav>
        )
    }
}

export default Navbar;