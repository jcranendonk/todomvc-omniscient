import {DOM} from 'react';
var {input, section, ul} = DOM;
import component from 'omniscient';
import action from './action';
import {show} from './constants';
import {activeTodoCount} from './utils';
import TodoItem from './TodoItem';

function byCompleted(showing) {
    switch (showing) {
        case show.completedTodos:
            return (todo) => todo.get('completed', false);
        case show.activeTodos:
            return (todo) => !todo.get('completed', false);
        default:
            return () => true;
    }
}

export default component(
    'TodoList',
    ({todos, editState, showingState}) => {
        let allCompleted = activeTodoCount(todos) === 0;
        let visibleTodos = todos.filter(byCompleted(showingState.deref(show.allTodos)));
        let todoItems = [
            for ([todoId, todo] of visibleTodos.entries())
                TodoItem(todoId, {todo, todoId, editState: editState.cursor(todoId)})
        ];

        if (todos.count() === 0) {
            return null;
        }

        return section({id: 'main'},
            input({
                id: 'toggle-all',
                type: 'checkbox',
                onChange: () => action.setAllCompleted(!allCompleted),
                checked: allCompleted
            }),
            ul({id: 'todo-list'}, todoItems)
        );
    });
