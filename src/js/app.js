// Polyfills
require('6to5/polyfill');
import omniscient from 'omniscient';

if (process.env.NODE_ENV !== 'production') {
    // Enable debugging options
    omniscient.debug();
}

import react from 'react';
import immutable from 'immutable';
import immstruct from 'immstruct';
import uuid from 'uuid';
import {show} from './constants';
import TodoApp from './TodoApp';

// Make React DevTools work
window.React = react;

// Include styles, html
require('../css/todomvc-base.css');
require('../css/styles.css');
require('file?name=index.html!../index.html');

// Set up immutable storage skeleton
let todoAppData = immstruct({
    items: {
        // // Example data:
        // [uuid.v4()]: {
        //     completed: false,
        //     title: 'get milk'
        // },
        // [uuid.v4()]: {
        //     completed: true,
        //     title: 'make presentation'
        // }
    }
});

// Init actions
import * as action from './action';
action._init(todoAppData);

// Main render cycle
render();
todoAppData.on('next-animation-frame', render);

function render() {
    react.render(TodoApp({todos: todoAppData.cursor('items'), state: todoAppData.cursor('state')}), document.getElementById('todoapp'));
}
