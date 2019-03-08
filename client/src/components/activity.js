import React, { Component } from 'react';
import ActivityCard from './activitycard';
const axios = require('axios');

class Activity extends Component {

    constructor(){
        super();
        this.retrieveActivitiesData = this.retrieveActivitiesData.bind(this);

        this.state = {
            activities: []
        }
    }

    retrieveActivitiesData() {
        axios.get('/activity')
        .then(activities => {
            // console.log(activities);
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
        })
        .catch(error => {
            return error;
        })
    }

    componentDidMount(){
        this.retrieveActivitiesData();
    }

    getActivityCards(){
        return this.state.activities.slice(0,10).map((activity, index) => {
            let verb = '';
            let noun = '';

            switch(Object.keys(activity)[1]){
                case 'caption':
                    verb = 'wrote';
                    noun = 'caption';
                    break;
                case 'vote':
                    verb = 'voted';
                    noun = 'comment/caption';
                    break;
                case 'comment':
                    verb = 'wrote';
                    noun = 'comment';
                    break;
                default:
                    break;
            }

            return (
                <ActivityCard
                    verb={ verb }
                    noun={ noun }
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