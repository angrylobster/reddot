import React, { Component } from 'react';
import Captions from './captions';
import Signup from './signup';

class Main extends Component {
  render() {
    return (
        <div
            className="div__wrapper-maincontent"
        >
            <img
                className="img__potd"
                src="https://www.asiaone.com/sites/default/files/original_images/Apr2016/0401_gohyongwei2.jpg"
                alt="Caption this"
            />
            <Captions/>
            <Signup/>
        </div>
      
    );
  }
}

export default Main;
