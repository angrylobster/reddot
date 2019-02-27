import React, { Component } from 'react';

class Register extends Component {

    constructor(){
        super();
        this.doRegister = this.doRegister.bind(this)
        this.changeHandler = this.changeHandler.bind(this)
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            registrationError: ''
        }
    }

    componentDidMount(){
        this.setState({
            registrationError: this.props.registrationError
        })
    }

    changeHandler(e){
        this.setState({
            [e.target.name]: e.target.value 
        })
    }

    getRegistrationErrorDiv(){
        return (
            <small
                className="text-danger d-block"
                id="registration-error"
            >
                { this.state.registrationError }
            </small>
        )
    }

    doRegister(e){
        e.preventDefault();
        if (this.state.password === this.state.confirmPassword){
            this.props.register(e, this.state.email, this.state.password);
        } else {
            this.setState({
                registrationError: 'Passwords do not match!'
            })
        }
    }

    displayError(){
        if (this.state.registrationError){
            return this.getRegistrationErrorDiv();
        }
    }

    render() {
        return (
            <form
                onSubmit={ e => { this.doRegister(e) }} 
                id="registration-form"
            >
                <div className="form-group">
                    { this.displayError() }
                    <label htmlFor="registration-email">Email address</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        id="registration-email" 
                        name="email" 
                        aria-describedby="emailHelp" 
                        placeholder="Enter email"
                        onChange={this.changeHandler}
                        autoComplete="on"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="registration-password">Password</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        id="registration-password" 
                        name="password" 
                        placeholder="Password"
                        onChange={this.changeHandler}
                        autoComplete="on"
                    />
                </div>                
                <div className="form-group">
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        id="confirm-password" 
                        name="confirmPassword" 
                        placeholder="Confirm Password"
                        onChange={this.changeHandler}
                        autoComplete="off"
                    />
                </div>
                <button 
                    type="submit" 
                    className="btn btn-primary"
                >
                    Register
                </button>
            </form>     
        );
    }
}

export default Register;
