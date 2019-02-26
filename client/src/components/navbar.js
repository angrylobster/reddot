import React, { Component } from 'react';

class Navbar extends Component{

    getLoginOrLogoutButton(){
        if (!this.props.currentUser){
            return( 
                <button 
                    className="btn btn-outline-light"
                    data-toggle="modal" 
                    data-target="#exampleModal"
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
    render(){
        return (
            <nav className="navbar navbar-dark navbar-expand-lg bg-dark fixed-top text-white">
                <a className="navbar-brand" href="/">
                    <h3 className="m-0">
                        Reddot
                    </h3>
                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02"
                    aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                    { this.getLoginOrLogoutButton() }
                </div>
            </nav>
        )
    }
}

export default Navbar;