import {key} from './constants';

export function completedTodoCount(todos) {
    return todos.count(t => t.get('completed', false));
}

export function activeTodoCount(todos) {
    return todos.count(t => !t.get('completed', false));
}

export function handleKeyDown(onAccept, onCancel) {
    return e => {
        switch (e.keyCode) {
            case key.enter:
                e.preventDefault();
                onAccept(e);
                break;
            case key.esc:
                e.preventDefault();
                onCancel(e);
                break;
        }
    };
}
