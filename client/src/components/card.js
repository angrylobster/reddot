import React, { Component } from 'react';

class Card extends Component {
  render() {
    return (
        <div className="d-flex p-2">
            <div
                className="div__wrapper-votearrows"
            >
                <img 
                    src="upvote.png"
                    className="w-100"
                    // className="img__votearrows"
                />
                <img 
                    src="downvote.png"
                    className="w-100"

                    // className="img__votearrows"
                />

            </div> 
            <div
                className="w-100 pl-2"
            >
                <div
                    className="d-flex"
                >
                    <small>Username</small>
                    <small>1000 points</small>
                    <small>59 mins ago</small>
                </div>
                <div>
                    <p>This is a caption about something people said some time ago but nobody knows what they meant so some people are asking about it.</p>
                </div>
            </div>

        </div>
    );
  }
}

export default Card;
