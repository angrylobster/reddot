import React, { Component } from 'react';
import Card from './card.js';
const axios = require('axios');


class Captions extends Component {

  constructor(){
      super();
      this.retrieveCaptionsData = this.retrieveCaptionsData.bind(this);

      this.state = {
          captions: [],
          user: ""
      }
  }

  retrieveCaptionsData() {
      axios.get('/captions')
      .then(json => {
          //Set caption state to have latest captions
          this.setState({
              //Save in state, all captions sorted by total_votes
              captions: json.data.captions.sort((a, b) => {
                  if (a.total_votes > b.total_votes){
                      return -1;
                  } else if (a.total_votes < b.total_votes){
                      return 1;
                  } else {
                      return 0;
                  }
              })
          });

          //Set user state to current user
          this.setState({
            //Save in state, all captions sorted by total_votes
            user: json.data.user
        });

          console.log(this.state.captions);
          console.log(this.state.user);
      })
      .catch(error => {
          return error;
      })
  }

  componentDidMount(){
      this.retrieveCaptionsData();
  }

  getCaptionCards(){
      return this.state.captions.slice(0,4).map((caption, index) => {
          return (
            <Card
              caption={ caption.caption }
              username={ caption.name }
              total_votes={ caption.total_votes }
              caption_id={ caption.id }
              user_id={ caption.user_id }
              comments={ caption.comments }
              votes={ caption.caption_votes }
              date={ caption.updated_at }
             />
          )
      })
  }

    render() {
        return (
            <div>
                { this.getCaptionCards() }
                <NewCaption/>
            </div>
        );
    }
}

class NewCaption extends Component{

    postCaption(input) {
      axios.post('/captions.json', {
          caption: input,
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
