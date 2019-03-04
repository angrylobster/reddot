import React, { Component } from 'react';
import Captions from './captions';

class Content extends Component {

    constructor(){
        super();
        this.state = {
            currentUser: null,
            currentPost: null
        }
    }

    componentDidMount(){
        this.setState({
            currentUser: this.props.currentUser,
            currentPost: this.props.currentPost
        })
    }

    render() {
        return (
            <div className="w-50 bg-white border border-light rounded overflow-hidden d-inline">
                <img
                    className="overflow-hidden"
                    src={ this.props.currentPost.img }
                    alt="Caption this"
                />
                <Captions
                    currentUser={ this.props.currentUser }
                    currentPost={ this.props.currentPost }
                />
            </div>
        
        );
    }
}

export default Content;
