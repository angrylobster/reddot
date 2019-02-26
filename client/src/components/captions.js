import React, { Component } from 'react';
import Card from './card.js';
const axios = require('axios');


class Captions extends Component {

  constructor(){
      super();
      this.retrieveCaptionsData = this.retrieveCaptionsData.bind(this);

      this.state = {
          captions: [],
          currentUser: null
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
              }),
              currentUser: json.data.user
          });
          this.props.setCurrentUser(json.data.user);
          //Set user state to current user
      })
      .catch(error => {
          return error;
      })
  }

  componentDidMount(){
      this.retrieveCaptionsData();
      this.setState({
        currentUser: this.props.currentUser
      })
  }

  getCaptionCards(){
      return this.state.captions.map((caption, index) => {
          return (
            <Card
              content={ caption.caption_text }
              poster={ caption.name }
              total_votes={ caption.total_votes }
              id={ caption.id }
              user_id={ caption.user_id }
              comments={ caption.comments }
              votes={ caption.caption_votes }
              date={ caption.updated_at }
              current_user={ this.state.user }
              key={ index + caption }
              id={ index + caption.name }
              renderViewComments={ true }
             />
          )
      })
  }

    render() {
        return (
            <React.Fragment>
                <div
                    style={{overflowY: "scroll", height: '280px'}}
                >
                    { this.getCaptionCards() }
                </div>
                <NewCaption/>
            </React.Fragment>
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
