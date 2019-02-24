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
                captions: captions.data.sort((a, b) => {
                    if (a.updated_at > b. updated_at){
                        return -1;
                    } else if (a.updated_at < b.updated_at){
                        return 1;
                    } else {
                        return 0;
                    }
                })
            });
        })
        .catch(error => {
            return error;
        })
    }

    getActivityCards(){
        return this.state.captions.slice(0,10).map((caption, index) => {
            return (
                <ActivityCard
                    verb='wrote'
                    noun='caption'
                    link='#'
                    name={ caption.name }
                    key={ index + caption}
                    date={ caption.updated_at }
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