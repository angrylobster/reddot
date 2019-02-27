import React, { Component } from 'react';
import Card from './card.js';
const axios = require('axios');


class Captions extends Component {

  constructor(){
      super();
      this.retrieveCaptionsData = this.retrieveCaptionsData.bind(this);
      this.getCaptionCards = this.getCaptionCards.bind(this);

      this.state = {
          currentCaptions: [{id: 0}],
          currentUser: null
      }
  }

  retrieveCaptionsData() {
      axios.get('/captions')
      .then(json => {
        //Set caption state to have latest captions
        if (this.state.currentCaptions[0].id == 0) {
            this.setState({ currentCaptions: json.data.captions });
        } else if (this.props.currentPost.id !== this.state.currentCaptions[0].post_id) {
            this.setState({ currentCaptions: json.data.captions });
        }
      })
      .catch(error => {
          return error;
      })
  }

  componentDidUpdate(){
    if (this.props.currentUser && !this.state.currentUser){
        console.log('setting current user')
        this.setState({
            currentUser: this.props.currentUser
        })
    }
  }

  getCaptionCards(){
      this.retrieveCaptionsData();
      return this.state.currentCaptions.map((caption, index) => {
          return (
            <Card
              currentUser={ this.props.currentUser }
              content={ caption.caption_text }
              poster={ caption.name }
              total_votes={ caption.total_votes }
              id={ caption.id }
              user_id={ caption.user_id }
              comments={ caption.comments }
              votes={ caption.caption_votes }
              date={ caption.updated_at }
              key={ index + caption }
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
                { this.props.currentUser ? <NewCaption currentPost={ this.props.currentPost } /> : null }
            </React.Fragment>
        );
    }
}

class NewCaption extends Component{

    postCaption(input) {
      axios.post('/captions.json', {
          caption: input,
          user_id: 0, //placeholder
          post_id: this.props.currentPost.id
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
