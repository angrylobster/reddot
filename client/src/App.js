import React, { Component } from 'react';
import Main from './components/main';
import Activity from './components/activity';
import Navbar from './components/navbar';
import Modal from './components/modal';
import './App.css';

class App extends Component {
    render() {
        return (
            <React.Fragment>
                <Navbar/>
                <Modal/>
                <div className="App">
                    <Main/>
                    <Activity/>
                </div>
            </React.Fragment>
        );
    }
}

export default App;
