import {DOM} from 'react';
let {header, h1, input} = DOM;
import component from 'omniscient';
import * as action from './action';
import {handleKeyDown} from './utils';

let clearAfterEdit = {
    componentDidUpdate(prevProps, prevState) {
        if (!this.props.editState.has('title') && prevProps.editState.has('title')) {
            this.refs.editBox.getDOMNode().value = '';
        }
    }
};

export default component(
    'TodoHeader',
    clearAfterEdit,
    ({editState}) => {
        let finish = e => {
            action.addTodo(editState.get('title'));
            editState.delete('title');
        };
        let cancel = _ => editState.delete('title');

        return header({id: 'header'},
                    h1({}, 'todos'),
                    input({
                        id: 'new-todo',
                        ref: 'editBox',
                        placeholder: 'What needs to be done?',
                        onBlur: cancel,
                        onChange: e => editState.set('title', e.currentTarget.value),
                        onKeyDown: handleKeyDown(finish, cancel),
                        autoFocus: true}));
    });
