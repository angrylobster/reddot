import React, { Component } from 'react';
import Register from './register';

class RegistrationModal extends Component {

    render() {
        return (
            <div 
                className="modal fade" 
                id="registration-modal" 
                tabIndex="-1" 
                role="dialog" 
                aria-labelledby="registration-modal" 
                aria-hidden="true"
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="registration-modal">Register</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <Register
                                register={ this.props.register }
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default RegistrationModal;