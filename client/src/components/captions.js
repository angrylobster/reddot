import React, { Component } from 'react';
import Caption from './caption.js';
const axios = require('axios');

class Captions extends Component {

    constructor() {
        super();
        this.getCaptions = this.getCaptions.bind(this);
        this.getCaptionComponents = this.getCaptionComponents.bind(this);

        this.state = {
            captions: [],
            currentUser: null
        }
    }

    componentDidMount(){
        this.getCaptions();
    }

    componentDidUpdate() {
        if (!this.state.currentUser && this.props.currentUser){
            this.setState({ currentUser: this.props.currentUser });
        } else if (this.state.currentUser && !this.props.currentUser) {
            this.setState({ currentUser: null });
        }
    }

    getCaptions() {
        axios.get('/captions')
        .then(captions => {
            console.log('captions', captions)
            this.setState({ captions: captions.data });
        })
        .catch(error => {
            console.log(error);
        })
    }

    getCaptionComponents() {
        return this.state.captions.map((caption, index) => {
            return ( 
                <Caption 
                    currentUser = { this.state.currentUser }
                    caption = { caption }
                    key = { index + caption }
                />
            )
        })
    }

    getNewCaptionComponent(){
        if(this.state.currentUser){
            return (
                <NewCaption
                    getCaptions={ this.getCaptions }
                    currentUser={ this.state.currentUser }
                    currentPost={ this.props.currentPost }
                />
            )
        }
    }

    render() {
        return ( 
            <React.Fragment>
                <div 
                    style = {{
                        overflowY: "scroll",
                        height: '280px'
                        }}
                >
                    { this.getCaptionComponents() } 
                </div> 
                    { this.getNewCaptionComponent() }
            </React.Fragment>
        );
    }
}

class NewCaption extends Component {

    constructor(){
        super();
        this.doPostCaption = this.doPostCaption.bind(this);
        this.postCaption = this.postCaption.bind(this);
    }

    postCaption(caption) {
        axios.post('/captions', {
            caption: caption,
            user_id: this.props.currentUser.id,
            post_id: this.props.currentPost.id
        })
        .then(function (response) {
            console.log(response);
            this.props.getCaptions();
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    doPostCaption(e){
        if (e.keyCode === 13){
            this.postCaption(e.target.value)
        }
    }

    render() {
        // console.log('current post', this.props.currentPost, 'current user', this.props.currentUser);
        return ( 
            <div className = "m-3 border-top">
                <input 
                    className = "border-0 mt-3 w-100 pl-2 pr-2"
                    placeholder = "Write your caption here..."
                    onKeyDown = { this.doPostCaption }
                /> 
            </div>
        )
    }
}

export default Captions;