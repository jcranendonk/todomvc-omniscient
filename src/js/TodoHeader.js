import {DOM} from 'react';
var {header, h1, input} = DOM;
import component from 'omniscient';
import {key} from './constants';
import action from './action';

function handleKeyDown(e, editState) {
    switch (e.keyCode) {
        case key.enter:
            e.preventDefault();
            action.addTodo(editState.get('title'));
            editState.delete('title');
            break;
        case key.esc:
            e.preventDefault();
            editState.delete('title');
            break;
    }
}

export default component(
    'TodoHeader',
    ({editState}) =>
        header({id: 'header'},
            h1({}, 'todos'),
            input({
                id: 'new-todo',
                placeholder: 'What needs to be done?',
                value: editState.get('title'),
                onBlur: () => editState.delete('title'),
                onChange: e => editState.set('title', e.currentTarget.value),
                onKeyDown: e => handleKeyDown(e, editState),
                autoFocus: true}))
);
