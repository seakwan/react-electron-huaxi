// const { districtList, getDoctorList } = require('./request');
// require('./proxy');

// const store = require('./store');

// setInterval(() => {
//     if (store.has('cookie')) {
//         console.log('--------------------------------');
//         console.log(store.get('cookie'));
//     }
// }, 5000);

import React, { Component } from 'react'
import ReactDOM from 'react-dom';
export class App extends Component {
    render() {
        const electron = window.electron;
        console.log(electron);
        return (
            <div>

                <h1>nimei</h1>
            </div>
        )
    }
}
ReactDOM.render(<App />, document.getElementById('root'));
