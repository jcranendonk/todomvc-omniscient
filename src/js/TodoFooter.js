import {DOM, addons} from 'react/addons';
var {div, footer, span, strong, ul, li, a, button} = DOM;
var {classSet: cx} = addons;
import component from 'omniscient';
import {show} from './constants';
import action from './action';

export default component(
    'TodoFooter',
    ({activeCount, completedCount, showingState}) => {
        let showing = showingState.deref();
        let clearButton;
        if (completedCount) {
            clearButton = button({
                id: 'clear-completed',
                onClick: () => action.clearCompleted()
            }, `Clear completed (${completedCount})`);
        }

        return footer({id: 'footer'},
            span({id: 'todo-count'}, strong({}, activeCount), ` item${activeCount === 1?'':'s'} left`),
            ul({id: 'filters'},
                li({},
                    a({
                        href: '#',
                        onClick: () => showingState.update(() => show.allTodos),
                        className: cx({selected: showing === show.allTodos})
                    }, 'ALL')),
                ' ',
                li({},
                    a({
                        href: '#',
                        onClick: () => showingState.update(() => show.activeTodos),
                        className: cx({selected: showing === show.activeTodos})
                    }, 'Active')),
                ' ',
                li({},
                    a({
                        href: '#',
                        onClick: () => showingState.update(() => show.completedTodos),
                        className: cx({selected: showing === show.completedTodos})
                    }, 'Completed'))),
            clearButton);
    });
