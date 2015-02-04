import {DOM} from 'react';
var {div} = DOM;
import component from 'omniscient';
import TodoHeader from './TodoHeader';
import TodoList from './TodoList';
import TodoFooter from './TodoFooter';
import {activeTodoCount, completedTodoCount} from './utils';

export default component(
    'TodoApp',
    ({todos, state}) =>
        div({},
            TodoHeader({editState: state.cursor(['editing', 'new'])}),
            TodoList({todos, state}),
            TodoFooter({
                activeCount: activeTodoCount(todos),
                completedCount: completedTodoCount(todos),
                showingState: state.cursor('showing')
            }))
);
