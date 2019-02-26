import React, { Component } from 'react';
import Card from './card.js';
const axios = require('axios');


class Captions extends Component {

  constructor(){
      super();
      this.retrieveCaptionsData = this.retrieveCaptionsData.bind(this);

      this.state = {
          captions: []
      }
  }

  retrieveCaptionsData() {
      axios.get('/captions')
      .then(captions => {
        console.log(captions);
          this.setState({
              captions: captions.data.sort((a, b) => {
                  if (a.updated_at > b.updated_at){
                      return -1;
                  } else if (a.updated_at < b.updated_at){
                      return 1;
                  } else {
                      return 0;
                  }
              })
          });
      })
      .catch(error => {
          return error;
      })
  }

  componentDidMount(){
      this.retrieveCaptionsData();
  }

  getCaptionCards(){
      return this.state.captions.slice(0,5).map((caption, index) => {
          return (
            <h1>hi</h1>
          )
      })
  }

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
