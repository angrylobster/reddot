import React, { Component } from 'react';
import Caption from './caption.js';
const axios = require('axios');

class Captions extends Component {
    constructor() {
        super();
        this.setCaptions = this.setCaptions.bind(this);
        this.getCaptionComponents = this.getCaptionComponents.bind(this);
        this.state = {
            captions: [],
        };
    }

    componentDidMount() {
        this.setCaptions();
    }

    setCaptions() {
        axios
            .get('/captions')
            .then(captions => {
                console.log('All captions', captions.data);
                this.setState({ captions: captions.data });
            })
            .catch(error => {
                console.log(error);
            });
    }

    getCaptionComponents() {
        if (this.state.captions.length === 0){
            return (
                <div
                    className="border-0 mt-3 mb-3 w-100 pl-2 pr-2 text-muted text-center"
                >No captions yet. Be the first one!</div>
            )
        } else {
            return this.state.captions.map((caption, index) => {
                return (
                    <Caption
                        currentUser={this.props.currentUser}
                        caption={caption}
                        setCaptions={this.setCaptions}
                        key={index + caption + this.props.currentUser}
                    />
                );
            });
        }
    }

    getNewCaptionComponent() {
        if (this.props.currentUser) {
            return (
                <NewCaption
                    setCaptions={this.setCaptions}
                    currentUser={this.props.currentUser}
                    currentPost={this.props.currentPost}
                />
            );
        }
    }

    render() {
        let height = '';
        this.state.captions.length < 7 ? height = 50 + (50 * this.state.captions.length) + ' px' : height = '400px';
        return (
            <React.Fragment>
                <div
                    style={{
                        overflowY: 'scroll',
                        height: height,
                    }}
                >
                    {this.getCaptionComponents()}
                </div>
                {this.getNewCaptionComponent()}
            </React.Fragment>
        );
    }
}

class NewCaption extends Component {
    constructor() {
        super();
        this.doPostCaption = this.doPostCaption.bind(this);
        this.postCaption = this.postCaption.bind(this);
    }

    postCaption(caption) {
        axios
            .post('/captions', {
                caption: caption,
                user_id: this.props.currentUser.id,
                post_id: this.props.currentPost.id,
            })
            .then(response => {})
            .catch(error => {
                console.log(error);
            })
            .then(() => {
                this.props.setCaptions();
            });
    }

    doPostCaption(e) {
        if (e.keyCode === 13) {
            this.postCaption(e.target.value);
            e.target.value = '';
        }
    }

    render() {
        return (
            <div className="m-3 border-top">
                <input
                    className="border-0 mt-3 w-100 pl-2 pr-2"
                    placeholder="Write your caption here..."
                    onKeyDown={this.doPostCaption}
                />
            </div>
        );
    }
}

export default Captions;
