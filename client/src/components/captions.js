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

    postCaption() {
        fetch('/captions.json', {
            method: 'POST',
            header: {
                'Accept': 'application/json',
                'content-type': 'application/json'
            },
            body: JSON.stringify({body: 'What the hell?', user_id: 1})
            
        }).then(response => {
            if (response.ok) { return response.json() } throw new Error('Request failed!');
        }, networkError => {
            console.log(networkError.message);
        }).then(jsonResponse => {
            return jsonResponse;
        });
    }

    render(){
        return (
            <div
                className="m-3 border-top"
            >
                <input 
                    className="border-0 mt-3 w-100 pl-2 pr-2"     
                    placeholder="Write your caption here..."
                />
                <button onClick={this.postCaption}>Post</button>
            </div>
        )

    }
}

export default Captions;
