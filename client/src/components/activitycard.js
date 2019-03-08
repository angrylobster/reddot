import React, { Component } from 'react';

class ActivityCard extends Component {

    constructor(){
        super();
        this.state={
        }
    }

    getCardContent(props){
        return (
            <small
                className="text-dark d-block"
            >
                {props.name} {props.verb} a <a href={ props.link }>{ props.noun }</a>.
            </small>
        )
    }

    getTimeTranspired(date){
        let timeTranspired;
        let diffMilliseconds = Date.now() - Date.parse(date);
        let diff = {
            seconds: (diffMilliseconds / 1000).toFixed(0),
            minutes: (diffMilliseconds / (1000 * 60)).toFixed(0),
            hours: (diffMilliseconds / (1000 * 60 * 60)).toFixed(0),
            days: (diffMilliseconds / (1000 * 60 * 60 * 24)).toFixed(0)
        }

        if (diff.seconds < 60) {
            timeTranspired = diff.seconds + " seconds ago"
        } else if (diff.minutes < 60) {
            timeTranspired = diff.minutes + " minutes ago"
        } else if (diff.hours < 24) {
            timeTranspired = diff.hours + " hours ago"
        } else {
            timeTranspired = diff.days + " days ago"
        }

        return (
            <small
                className="d-block"
            >
                { timeTranspired }
            </small>
        )
    }

    render() {
        return (
            <div className="p-1">
                { this.getCardContent(this.props) }
                { this.getTimeTranspired(this.props.date) }
            </div>
        );
    }
}

export default ActivityCard;
