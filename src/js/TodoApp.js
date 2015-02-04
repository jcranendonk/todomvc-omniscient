import {DOM} from 'react';
let {div} = DOM;
import component from 'omniscient';
import TodoHeader from './TodoHeader';
import TodoList from './TodoList';
import TodoFooter from './TodoFooter';
import {activeTodoCount, completedTodoCount} from './utils';

export default component(
    'TodoApp',
    ({todos, state}) => {
        return div({},
                TodoHeader({editState: state.cursor(['editing', 'header'])}),
                TodoList({
                    todos,
                    editState: state.cursor(['editing', 'list']),
                    showingState: state.cursor('showing')
                }),
                TodoFooter({
                    activeCount: activeTodoCount(todos),
                    completedCount: completedTodoCount(todos),
                    showingState: state.cursor('showing')
                }));
    });
