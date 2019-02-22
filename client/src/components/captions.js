import React, { Component } from 'react';
import Card from './card.js';

class Captions extends Component {
    render() {
        return (
            <div>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <NewCaption/>
            </div>
        );
    }
}

class NewCaption extends Component{
    render(){
        return (
            <div
                className="m-3 border-top"
            >
                <input 
                    className="border-0 mt-3 w-100 pl-2 pr-2"     
                    placeholder="Write your caption here..."
                />
            </div>
        )

    }
}

export default Captions;
