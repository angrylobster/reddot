import React, { Component } from 'react';
const axios = require('axios');

class Comment extends Component {
    constructor(props) {
        super(props);
    }

    getUserVoteValue() {
        if (this.getUserVote()) {
            return this.getUserVote().vote;
        }
    }

    getUserVote() {
        if (this.props.currentUser) {
            return this.props.comment.comment_votes.find(vote => {
                if (vote.user_id === this.props.currentUser.id) {
                    return vote;
                } else {
                    return null;
                }
            });
        } else {
            return false;
        }
    }

    toggleVote(arrowClicked) {
        if (!this.props.currentUser) {
            return;
        }
        if (arrowClicked === 'down') {
            if (this.getUserVoteValue() === -1) {
                this.postVote(0);
            } else {
                this.postVote(-1);
            }
        } else {
            if (this.getUserVoteValue() === 1) {
                this.postVote(0);
            } else {
                this.postVote(1);
            }
        }
    }

    postVote(vote) {
        if (this.props.currentUser) {
            axios
                .post('/comment_votes', {
                    caption_id: this.props.captionID,
                    poster_id: this.props.comment.poster_id,
                    vote: vote,
                    user_id: this.props.currentUser.id,
                    comment_id: this.props.comment.id,
                })
                .then(response => {
                    this.setState({
                        total_votes: response.data.total_votes,
                        voted: vote,
                    });
                })
                .catch(error => {
                    console.log('Vote error', error);
                })
                .then(() => {
                    this.props.setCaptions();
                });
        }
    }

    getUpvoteArrow() {
        if (this.getUserVoteValue() === 1) {
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
        if (this.getUserVoteValue() === -1) {
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

    getPointsString() {
        let pointsString = this.props.comment.comment_total_votes + ' ';
        this.props.comment.comment_total_votes === 1
            ? (pointsString += 'point')
            : (pointsString += 'points');
        return pointsString;
    }

    render() {
        return (
            <div className="d-flex p-2">
                <div className="div__wrapper-votearrows">
                    {this.getUpvoteArrow()}
                    {this.getDownvoteArrow()}
                </div>
                <div className="w-100 pl-2">
                    <div className="d-flex">
                        <small>{this.props.comment.name}</small>
                        <small>{this.getPointsString()}</small>
                        <small>
                            {this.props.getTimeTranspired(
                                this.props.comment.created_at
                            )}
                        </small>
                    </div>
                    <div>
                        <p>{this.props.comment.comment_text}</p>
                    </div>
                </div>
            </div>
        );
    }
}
export default Comment;
