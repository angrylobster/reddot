import React, { Component } from 'react';

class Card extends Component {

    constructor(){
        super();
        this.toggleVote = this.toggleVote.bind(this);
        this.state={
            upvoted: false,
            downvoted: false
        }
    }

    toggleVote(arrowClicked){
        if (arrowClicked === 'down'){
            if (this.state.downvoted){
                this.setState({
                    upvoted: false,
                    downvoted: false
                })
            } else {
                this.setState({
                    upvoted: false,
                    downvoted: true
                })
            }
        } else {
            if (this.state.upvoted){
                this.setState({
                    upvoted: false,
                    downvoted: false
                })
            } else {
                this.setState({
                    upvoted: true,
                    downvoted: false
                })
            }
        }
    }

    getUpvoteArrow(){
        if (this.state.upvoted){
            return (
                <img src="upvoted.png" onClick={ () => { this.toggleVote('up') }} alt="Upvoted arrow"/>
            )
        } else {
            return (
                <img src="upvote.png" onClick={ () => { this.toggleVote('up') }} alt="Upvote arrow"/>
            )
        }
    }

    getDownvoteArrow(){
        if (this.state.downvoted){
            return (
                <img src="downvoted.png" onClick={ () => { this.toggleVote('down') }} alt="Downvoted arrow"/>
            )
        } else {
            return (
                <img src="downvote.png" onClick={ () => { this.toggleVote('down') }} alt="Downvote arrow"/>
            )
        }
    }

    render() {
        return (
            <div className="d-flex p-2">
                <div
                    className="div__wrapper-votearrows"
                >
                    { this.getUpvoteArrow() }
                    { this.getDownvoteArrow() }
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
