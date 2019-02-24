import React, { Component } from 'react';

class ActivityCard extends Component {

    constructor(){
        super();
        this.state={
        }
    }

    generateCardContent(props){
        return(
            <small
                className="text-dark"
            >
                {props.user} {props.action} a <a href={ props.link }>{ props.linkType }</a>.
            </small>
        )
    }

    render() {
        return (
            <div className="d-flex p-1">
                { this.generateCardContent(this.props) }
            </div>
        );
    }
}

export default ActivityCard;
