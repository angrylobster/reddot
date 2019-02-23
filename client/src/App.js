import React, { Component } from 'react';
import Main from './components/main';
import Utility from './components/utility';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Main/>
                <Utility/>
            </div>
        );
    }
}

export default App;
