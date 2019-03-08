import React, { Component } from 'react';
import Comment from './comment.js';
const axios = require('axios');
class Caption extends Component {
    constructor(props) {
        super(props);
        this.postVote = this.postVote.bind(this);
        this.toggleVote = this.toggleVote.bind(this);
        this.toggleComments = this.toggleComments.bind(this);
        this.toggleReplying = this.toggleReplying.bind(this);
        this.getComments = this.getComments.bind(this);
        this.state = {
            comments: this.props.caption.comments,
            currentUser: this.props.currentUser,
            displayComments: false,
            isReplying: false,
            totalVotes: this.props.caption.total_votes,
            voted: this.getUserVoteValue(),
        };
    }

    componentDidUpdate() {
        if (this.props.currentUser && !this.state.currentUser) {
            this.setState({
                currentUser: this.props.currentUser,
            });
        } else if (this.state.currentUser && !this.props.currentUser) {
            this.setState({
                currentUser: null,
                isReplying: false,
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
                        totalVotes: response.data.total_votes,
                        voted: vote,
                    });
                })
                .catch(error => {
                    console.log('Vote error', error);
                })
                .then(() => {
                    this.props.setCaptions();
                })
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

    toggleComments() {
        if (this.props.comments.length === 0) {
            return;
        }
        if (this.props.displayComments === true) {
            this.setState({
                displayComments: false,
            });
        } else {
            this.setState({
                displayComments: true,
            });
        }
    }

    toggleReplying() {
        console.log(this.state.isReplying);
        if (this.state.isReplying) {
            this.setState({
                isReplying: false,
            });
        } else {
            this.setState({
                isReplying: true,
            });
        }
    }

    postComment(comment) {
        axios
            .post('/comments', {
                comment: comment,
                user_id: this.state.currentUser.id,
                caption_id: this.props.caption.id,
                total_votes: 0,
            })
            .then(response => {
                console.log('Comment success', response);
            })
            .catch(error => {
                console.log('Comment error', error);
            })
            .then(() => { 
                this.setState({ isReplying: false });
                this.props.setCaptions();
            });
    }

    doComment(e) {
        if (e.keyCode === 13) {
            this.postComment(e.target.value);
        }
    }

    getReplyForm() {
        if (!this.state.isReplying){
            return;
        }
        return (
            <input
                className="rounded border border-gray w-100 p-1 pl-2 pr-2 mt-1"
                placeholder="Reply"
                onKeyDown={e => {
                    this.doComment(e);
                }}
                style={{ fontSize: '13px' }}
            />
        );
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

    getCommentsString() {
        let commentsTextPrompt = '';
        if (!this.props.comments){
            commentsTextPrompt = 'no comments'; 
        } else {
            if (this.props.comments.length === 0) {
                commentsTextPrompt = 'no comments';
            } else if (this.state.displayComments) {
                commentsTextPrompt = 'hide comments';
            } else {
                commentsTextPrompt =
                    'view comments(' + this.props.comments.length + ')';
            }
        }

        return (
            <>
                <small onClick={this.toggleComments}>
                    {commentsTextPrompt}
                </small>
                <small onClick={this.toggleReplying}>reply</small>
            </>
        );
    }

    getComments() {
        if (this.state.displayComments && this.props.caption.comments) {
            return this.props.caption.comments.map((comment, index) => {
                return (
                    <Comment
                        currentUser={this.state.currentUser}
                        captionID={this.props.caption.id}
                        comment={comment}
                        key={index + comment}
                        getTimeTranspired={this.getTimeTranspired}
                        setCaptions={this.props.setCaptions}
                    />
                );
            });
        }
    }

    getPointsString() {
        let pointsString = this.state.totalVotes + " ";
        this.state.totalVotes === 1
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
                        <small>{this.props.caption.name}</small>
                        <small>
                            {this.getPointsString()}
                        </small>
                        <small>
                            {this.getTimeTranspired(
                                this.props.caption.created_at
                            )}
                        </small>
                    </div>
                    <div>
                        <p>{this.props.caption.caption_text}</p>
                        <div className="d-flex">{this.getCommentsString()}</div>
                        {this.getComments()}
                        {this.getReplyForm()}
                    </div>
                </div>
            </div>
        );
    }
}

export default Caption;
