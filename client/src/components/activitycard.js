import React, { Component } from 'react';

class ActivityCard extends Component {

    constructor(){
        super();
        this.state={
        }
    }

    generateCardContent(type){
        switch(type){
            case 'like':
                return(
                    <small
                        className="text-dark"
                    >
                        {this.props.user} liked a {this.props.linkType}.
                    </small>
                )
        }
    }

    render() {
        return (
            <div className="d-flex p-1">
                { this.generateCardContent(this.props.type) }
                {/* <small className="text-dark">Someone upvoted something.</small> */}
            </div>
        );
    }
}

export default ActivityCard;
