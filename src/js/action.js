import uuid from 'uuid';
import immutable from 'immutable';

let getCursor;

export function setAllCompleted(completed) {
    if (!getCursor) return;
    getCursor('items').withMutations(todos => {
        for (let id of todos.keys()) {
            todos.setIn([id, 'completed'], completed);
        }
    });
}

export function setCompleted(id, completed) {
    if (!getCursor) return;
    getCursor(['items', id]).set('completed', completed);
}

export function clearCompleted() {
    if (!getCursor) return;
    getCursor('items').update(todos => todos.filter(todo => !todo.get('completed')));
}

export function removeTodo(id) {
    if (!getCursor) return;
    getCursor('items').delete(id);
}

export function addTodo(title) {
    if (!getCursor) return;
    if (title) {
        getCursor('items').set(uuid.v4(), immutable.fromJS({title, completed: false}));
    }
}

export function updateTodo(todoId, title) {
    if (!getCursor) return;
    let items = getCursor('items');
    if (items.has(todoId)) {
        items.setIn([todoId, 'title'], title);
    }
}

export function _init(structure) {
    getCursor = (keyOrPath = []) => structure.cursor([].concat(keyOrPath));
}
