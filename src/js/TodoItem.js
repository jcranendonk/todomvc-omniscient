import {DOM, addons} from 'react/addons';
let {div, li, input, label, button} = DOM;
let {classSet: cx} = addons;
import component from 'omniscient';
import {key} from './constants';
import action from './action';

function handleKeyDown(e, todoId, editState) {
    switch (e.keyCode) {
        case key.enter:
            e.preventDefault();
            action.updateTodo(todoId, editState.get('title'));
            editState.delete('title');
            break;
        case key.esc:
            e.preventDefault();
            editState.delete('title');
            break;
    }
}

let focusOnEdit = {
    componentDidUpdate: function() {
        if (this.props.editState.has('title')) {
            this.refs.editField.getDOMNode().focus();
        }
    }
};

export default component(
    'TodoItem',
    focusOnEdit,
    ({todo, todoId, editState}) => {
        let completed = todo.get('completed', false);
        let editing = editState.has('title');
        return li({
                className: cx({completed, editing})
            },
            div({className: 'view'},
                input({
                    className: 'toggle',
                    type: 'checkbox',
                    checked: completed,
                    onChange: () => action.setCompleted(todoId, !completed)
                }),
                label({
                    onDoubleClick: () => editState.set('title', todo.get('title'))
                }, todo.get('title') || '[No text]'),
                button({
                    className: 'destroy',
                    onClick: () => action.removeTodo(todoId)
                })),
            input({
                className: 'edit',
                ref: 'editField',
                value: editState.get('title'),
                onBlur: () => editState.delete('title'),
                onChange: e => editState.set('title', e.currentTarget.value),
                onKeyDown: e => handleKeyDown(e, todoId, editState)
            })
        );
    });
