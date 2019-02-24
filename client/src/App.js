import React, { Component } from 'react';
import Main from './components/main';
import Activity from './components/activity';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Main/>
                <Activity/>
            </div>
        );
    }
}

export default App;
