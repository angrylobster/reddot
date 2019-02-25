import React, { Component } from 'react';
import Main from './components/main';
import Activity from './components/activity';
import Login from './components/login';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
            <Login/>
                <Main/>
                <Activity/>
            </div>
        );
    }
}

export default App;
