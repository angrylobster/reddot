import React, { Component } from 'react';
const axios = require('axios');
class Card extends Component {

    constructor(){
        super();
        this.postVote = this.postVote.bind(this);
        this.toggleVote = this.toggleVote.bind(this);
        this.toggleComments = this.toggleComments.bind(this);
        this.getComments = this.getComments.bind(this);
        this.state={
            upvoted: false,
            downvoted: false,
            total_votes: 0,
            comments: [],
            displayComments: false
        }
    }

    componentDidMount(){
        this.setState({ total_votes: this.props.total_votes })
        //Update Caption total_votes
        // axios.put(`/captions/${this.props.id}.json`, {
        //     total_votes: 0
        // })
        //     .then(function(response) {
        //     console.log(response);
        // })
        //     .catch(function(error) {
        //     console.log(error);
        // });
    }

    postVote(vote) {
        if (!(this.props.current_user == null)) {
            axios.post('/caption_votes.json', {
                vote: vote,
                user_id: this.props.current_user.id,
                caption_id: this.props.id
            })
                .then(function(response) {
                console.log(response);
            })
                .catch(function(error) {
                console.log(error);
            });
        }
      }

    toggleVote(arrowClicked){
        if (arrowClicked === 'down'){
            if (this.state.downvoted){
                this.setState({
                    upvoted: false,
                    downvoted: false
                })
                //make vote to 0
                this.postVote(0)
            } else {
                this.setState({
                    upvoted: false,
                    downvoted: true
                })
                //make vote to -1
                this.postVote(-1)
            }
        } else {
            if (this.state.upvoted){
                this.setState({
                    upvoted: false,
                    downvoted: false
                })
                this.postVote(0)
            } else {
                this.setState({
                    upvoted: true,
                    downvoted: false
                })
                this.postVote(1)
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

    getTimeTranspired(date){
        let timeTranspired;
        let diffMilliseconds = Date.now() - Date.parse(date);
        let diff = {
            seconds: (diffMilliseconds / 1000).toFixed(1),
            minutes: (diffMilliseconds / (1000 * 60)).toFixed(1),
            hours: (diffMilliseconds / (1000 * 60 * 60)).toFixed(1),
            days: (diffMilliseconds / (1000 * 60 * 60 * 24)).toFixed(1)
        }

        if (diff.seconds < 60) {
            timeTranspired = diff.seconds + " seconds ago"
        } else if (diff.minutes < 60) {
            timeTranspired = diff.minutes + " minutes ago"
        } else if (diff.hours < 24) {
            timeTranspired = diff.hours + " hours ago"
        } else {
            timeTranspired = diff.days + " days ago"
        }

        return (
            <small>
                { timeTranspired }
            </small>
        )
    }

    renderViewComments(){
        if (this.props.renderViewComments === true){
            return (
                <small
                    onClick={ this.toggleComments }
                >
                    {this.state.displayComments === true ? 'hide comments' : 'view comments' }
                </small>
            )
        }
    }

    toggleComments(){
        console.log(this.state.displayComments)
        if (this.state.displayComments === true){
            this.setState({
                displayComments: false
            })
        } else {
            this.setState({
                displayComments: true
            })
        }
    }

    getComments(){
        if (this.props.comments){
            return this.props.comments.map((comment, index) => {
                return (
                    <Card
                        content={ comment.comment_text }
                        poster={ comment.name }
                        total_votes={ comment.comment_votes }
                        id={ comment.id }
                        user_id={ comment.user_id }
                        comments={ null }
                        votes={ null }
                        date={ comment.updated_at }
                        current_user={ this.state.user }
                        key={ index + comment }
                        id={ index + comment.name }
                    />
                )
            })
        }
        return (
            null
        )
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
                    <div className="d-flex">
                        <small>{this.props.poster}</small>
                        <small>{this.state.total_votes > 1 ? `${this.state.total_votes} points`: `${this.state.total_votes} point`}</small>
                        <small>{this.getTimeTranspired(this.props.date)}</small>
                    </div>
                    <div
                    >
                        <p>
                            { this.props.content }
                        </p>
                        <div className="d-flex">
                            { this.renderViewComments() }
                        </div>
                        { this.state.displayComments === true ? this.getComments() : null }
                    </div>
                </div>
            </div>
        );
    }
}

export default Card;
