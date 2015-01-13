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
        case show.allTodos:
        default:
            return () => true;
    }
}

export default component(
    'TodoList',
    ({todos, state}) => {
        let allCompleted = activeTodoCount(todos) === 0;
        let visibleTodos = todos.filter(byCompleted(state.get('showing', show.allTodos)));
        let todoItems = [
            for ([todoId, todo] of visibleTodos.entries())
                TodoItem(todoId, {todo, todoId, editState: state.cursor(['editing', todoId])})
        ];
        if (todos.count()) {
            return section({id: 'main'},
                input({
                    id: 'toggle-all',
                    type: 'checkbox',
                    onChange: () => action.setAllCompleted(!allCompleted),
                    checked: allCompleted
                }),
                ul({id: 'todo-list'}, todoItems)
            );
        }
        return null;
    }
);
