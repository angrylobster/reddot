import React, { Component } from 'react';
const axios = require('axios');
class Caption extends Component {
    constructor() {
        super();
        this.postVote = this.postVote.bind(this);
        this.toggleVote = this.toggleVote.bind(this);
        this.toggleComments = this.toggleComments.bind(this);
        this.getComments = this.getComments.bind(this);

        this.state = {
            comments: [],
            currentUser: null,
            displayComments: false,
            total_votes: 0,
            voted: 0,
        };
    }

    componentDidMount() {
        this.setState({
            voted: this.getUserVoteValue(),
            total_votes: this.props.caption.total_votes,
        });
    }

    componentDidUpdate() {
        if (this.props.currentUser && !this.state.currentUser) {
            this.setState({
                currentUser: this.props.currentUser,
            });
        } else if (this.state.currentUser && !this.props.currentUser) {
            this.setState({
                currentUser: null,
                voted: 0,
            });
        }
    }

    getUserVoteValue() {
        if (this.getUserVote()) {
            return this.getUserVote().vote;
        }
    }

    getUserVote() {
        if (this.props.currentUser) {
            return this.props.caption.caption_votes.find(vote => {
                console.log(vote.user_id, this.props.currentUser.id);
                if (vote.user_id === this.props.currentUser.id) {
                    console.log('found');
                    return vote;
                }
            });
        } else {
            return false;
        }
    }

    postVote(vote) {
        if (this.props.currentUser) {
            axios
                .post('/caption_votes', {
                    vote: vote,
                    user_id: this.props.currentUser.id,
                    caption_id: this.props.caption.id,
                })
                .then(response => {
                    console.log('Vote success', response);
                    this.setState({
                        total_votes: response.data.total_votes,
                        voted: vote,
                    });
                })
                .catch(error => {
                    console.log('Vote error', error);
                });
        }
    }

    toggleVote(arrowClicked) {
        if (!this.props.currentUser) {
            return;
        }
        if (arrowClicked === 'down') {
            if (this.state.voted === -1) {
                this.postVote(0);
            } else {
                this.postVote(-1);
            }
        } else {
            if (this.state.voted === 1) {
                this.postVote(0);
            } else {
                this.postVote(1);
            }
        }
    }

    getUpvoteArrow() {
        if (this.state.voted === 1) {
            return (
                <img
                    src="upvoted.png"
                    onClick={() => {
                        this.toggleVote('up');
                    }}
                    alt="Upvoted arrow"
                />
            );
        } else {
            return (
                <img
                    src="upvote.png"
                    onClick={() => {
                        this.toggleVote('up');
                    }}
                    alt="Upvote arrow"
                />
            );
        }
    }

    getDownvoteArrow() {
        if (this.state.voted === -1) {
            return (
                <img
                    src="downvoted.png"
                    onClick={() => {
                        this.toggleVote('down');
                    }}
                    alt="Downvoted arrow"
                />
            );
        } else {
            return (
                <img
                    src="downvote.png"
                    onClick={() => {
                        this.toggleVote('down');
                    }}
                    alt="Downvote arrow"
                />
            );
        }
    }

    getTimeTranspired(date) {
        let timeTranspired;
        let diffMilliseconds = Date.now() - Date.parse(date);
        let diff = {
            seconds: (diffMilliseconds / 1000).toFixed(0),
            minutes: (diffMilliseconds / (1000 * 60)).toFixed(0),
            hours: (diffMilliseconds / (1000 * 60 * 60)).toFixed(0),
            days: (diffMilliseconds / (1000 * 60 * 60 * 24)).toFixed(0),
        };

        if (diff.seconds < 60) {
            timeTranspired = diff.seconds + ' seconds ago';
        } else if (diff.minutes < 60) {
            timeTranspired = diff.minutes + ' minutes ago';
        } else if (diff.hours < 24) {
            timeTranspired = diff.hours + ' hours ago';
        } else {
            timeTranspired = diff.days + ' days ago';
        }

        return <small>{timeTranspired}</small>;
    }

    getCommentsText() {
        let commentsTextPrompt = '';
        this.state.displayComments ? commentsTextPrompt = 'hide comments' : commentsTextPrompt = 'view comments';
        return <small onClick={this.toggleComments}>{commentsTextPrompt}</small>;
    }

    toggleComments() {
        console.log(this.state.displayComments);
        if (this.state.displayComments === true) {
            this.setState({
                displayComments: false,
            });
        } else {
            this.setState({
                displayComments: true,
            });
        }
    }

    getComments() {
        if (this.props.caption.comments) {
            return this.props.caption.comments.map((comment, index) => {
                return (
                    <Caption
                        content={comment.comment_text}
                        poster={comment.name}
                        total_votes={comment.comment_votes}
                        id={comment.id}
                        user_id={comment.user_id}
                        comments={null}
                        votes={null}
                        date={comment.updated_at}
                        current_user={this.state.currentUser}
                        key={index + comment}
                    />
                );
            });
        }
        return null;
    }

    getPointsString(){
        let pointsString = '';
        this.state.total_votes === 1 ? pointsString = 'point' : pointsString = 'points';
        return pointsString;
    }

    render() {
        console.log('Caption state:', this.state, 'Caption props', this.props);
        return (
            <div className="d-flex p-2">
                <div className="div__wrapper-votearrows">
                    {this.getUpvoteArrow()}
                    {this.getDownvoteArrow()}
                </div>
                <div className="w-100 pl-2">
                    <div className="d-flex">
                        <small>{this.props.caption.name}</small>
                        <small>
                            {this.state.total_votes}
                            {" " + this.getPointsString()}
                        </small>
                        <small>
                            {this.getTimeTranspired(this.props.caption.created_at)}
                        </small>
                    </div>
                    <div>
                        <p>{this.props.caption.caption_text}</p>
                        <div className="d-flex">{this.getCommentsText()}</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Caption;
