import React, { Component } from 'react';
import Login from './login';

class Modal extends Component {

    render() {
        return (
            <div 
                className="modal fade" 
                id="exampleModal" 
                tabIndex="-1" 
                role="dialog" 
                aria-labelledby="exampleModalLabel" 
                aria-hidden="true"
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Login</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <Login
                                login={ this.props.login }
                                loginError={ this.props.loginError }
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Modal;