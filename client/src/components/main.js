import React, { Component } from 'react';
import Captions from './captions';
class Main extends Component {
  render() {
    return (
        <div
            className="div__wrapper-maincontent"
        >
            <img
                className="img__potd"
                src={ this.props.currentPost.img }
                alt="Caption this"
            />
            <Captions
              setCurrentUser={ this.props.setCurrentUser }
              currentUser={ this.props.currentUser }
              currentPost={ this.props.currentPost }
            />
        </div>
      
    );
  }
}

export default Main;
