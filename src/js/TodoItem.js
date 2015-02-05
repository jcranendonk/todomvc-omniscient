import {DOM, addons} from 'react/addons';
let {div, li, input, label, button} = DOM;
let {classSet: cx} = addons;
import component from 'omniscient';
import * as action from './action';
import {handleKeyDown} from './utils';

let focusOnEdit = {
    componentDidUpdate(prevProps, prevState) {
        if (this.props.editState.has('title') && !prevProps.editState.has('title')) {
            let node = this.refs.editBox.getDOMNode();
            node.focus();
            node.setSelectionRange(node.value.length, node.value.length);
        }
    }
};

export default component(
    'TodoItem',
    focusOnEdit,
    ({todo, todoId, editState}, {doStuff}) => {
        let completed = todo.get('completed', false);
        let editing = editState.has('title');
        let title = todo.get('title');

        let editBox;
        if (editing) {
            let finish = e => {
                action.updateTodo(todoId, editState.get('title'));
                editState.delete('title');
            };
            let cancel = _ => editState.delete('title');
            editBox = input({
                            className: 'edit',
                            ref: 'editBox',
                            defaultValue: todo.get('title'),
                            onBlur: cancel,
                            onChange: e => editState.set('title', e.currentTarget.value),
                            onKeyDown: handleKeyDown(finish, cancel)
                        });
        }

        return li({className: cx({completed, editing})},
                    div({className: 'view'},
                        input({
                            className: 'toggle',
                            type: 'checkbox',
                            checked: completed,
                            onChange: _ => {action.setCompleted(todoId, !todo.get('completed')); doStuff();}
                        }),
                        label({
                            onDoubleClick: _ => editState.set('title', title)
                        }, title || '[No text]'),
                        button({
                            className: 'destroy',
                            onClick: _ => action.removeTodo(todoId)
                        })),
                    editBox);
    });
