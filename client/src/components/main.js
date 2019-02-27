import React, { Component } from 'react';
import Captions from './captions';
class Main extends Component {

  // constructor(){
  //   consol
  //   this.state = {
  //     currentUser: null
  //   }
  // }

  render() {
    return (
        <div
            className="div__wrapper-maincontent"
        >
            <img
                className="img__potd"
                src={ this.props.currentImg.img }
                alt="Caption this"
            />
            <Captions
              currentUser={ this.props.currentUser }
              currentImg={ this.props.currentImg }
            />
        </div>
      
    );
  }
}

export default Main;
