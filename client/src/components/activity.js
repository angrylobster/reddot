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
            return (
                <ActivityCard
                    verb='wrote'
                    noun='caption'
                    link='#'
                    name={ caption.name }
                    key={ index + caption}
                    date={ caption.created_at }
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