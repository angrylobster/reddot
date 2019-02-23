import React, { Component } from 'react';
import ActivityCard from './activitycard';
const axios = require('axios');

class Activity extends Component {

    constructor(){
        super();
        this.state = {
            captions: []
        }
    }

    componentDidMount(){
        axios.get('/captions')
        .then(captions => {
            this.setState({
                captions: captions.data
            });
        })
        .catch(error => {
            return error;
        })
    }

    getActivityCards(){
        return this.state.captions.map((caption, index) => {
            console.log(caption)
            return (
                <ActivityCard
                    action='wrote'
                    linkType='caption'
                    link='#'
                    user={ caption.user_id }
                    key={ index + caption}
                />
            )
        })
    }

    render() {
        return (
            <div
                className="div__wrapper-utility"
            >
                <p
                    className="text-secondary"
                >
                    Recent Activity
                </p>
                { this.getActivityCards() }
            </div>
        );
    }
}

export default Activity;