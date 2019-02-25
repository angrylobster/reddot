import React, { Component } from 'react';
import ActivityCard from './activitycard';
const axios = require('axios');

class Activity extends Component {

    constructor(){
        super();
        this.state = {
            activities: []
        }
    }

    componentDidMount(){
        axios.get('/activity')
        .then(activities => {
            console.log(activities);
            this.setState({
                activities: activities.data.sort((a, b) => {
                    if (a.updated_at > b.updated_at){
                        return -1;
                    } else if (a.updated_at < b.updated_at){
                        return 1;
                    } else {
                        return 0;
                    }
                })
            });
            console.log(this.state.activities);

        })
        .catch(error => {
            return error;
        })
    }

    getActivityCards(){
        return this.state.activities.slice(0,10).map((activity, index) => {
            return (
                <ActivityCard
                    verb='wrote'
                    noun='activity'
                    link='#'
                    name={ activity.name }
                    key={ index + activity}
                    date={ activity.updated_at }
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