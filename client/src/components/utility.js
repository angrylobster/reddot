import React, { Component } from 'react';
import ActivityCard from './activitycard';

class Utility extends Component {
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
                <ActivityCard
                    type='like'
                    linkType='post'
                    link='#'
                    user="Test User"
                />

            </div>
        );
    }
}

export default Utility;