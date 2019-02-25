import React, { Component } from 'react';
import Card from './card.js';
const axios = require('axios');


class Captions extends Component {
    render() {
        return (
            <div>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <NewCaption/>
            </div>
        );
    }
}

class NewCaption extends Component{

    postCaption(input) {
      axios.post('/captions.json', {
          body: input,
          user_id: 0 //placeholder
      })
          .then(function(response) {
          console.log(response);
      })
          .catch(function(error) {
          console.log(error);
      });
    }

    render(){
        return (
            <div
                className="m-3 border-top"
            >
                <input 
                    className="border-0 mt-3 w-100 pl-2 pr-2"     
                    placeholder="Write your caption here..."
                    onKeyDown={e => { 
                        if (e.keyCode === 13){
                            this.postCaption(e.target.value);
                        } 
                    }}
                />
            </div>
        )

    }
}

export default Captions;
