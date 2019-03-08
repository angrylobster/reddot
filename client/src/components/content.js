import React, { Component } from 'react';
import Captions from './captions';

class Content extends Component {
    render() {
        return (
            <div className="w-50 bg-white border border-gray rounded overflow-hidden d-inline mb-5">
                <img
                    // className="overflow-hidden"
                    src={this.props.currentPost.img}
                    alt="Caption this"
                    style={{ 
                        // minWidth: '100%',
                        minHeight: '500px',
                        objectFit: "cover",
                        objectPosition: '50% 50%'
                    }}
                />
                <Captions
                    currentUser={this.props.currentUser}
                    currentPost={this.props.currentPost}
                />
            </div>
        );
    }
}

export default Content;
