import uuid from 'uuid';
import immutable from 'immutable';

let getCursor;

function nextTick(fn) {
    setTimeout(fn, 0);
}

export function setAllCompleted(completed) {
    if (!getCursor) return;
    nextTick(() =>
        getCursor('items').withMutations(todos => {
            for (let id of todos.keys()) {
                todos.setIn([id, 'completed'], completed);
            }
        }));
}

export function setCompleted(id, completed) {
    if (!getCursor) return;
    nextTick(() =>
        getCursor(['items', id]).set('completed', completed));
}

export function clearCompleted() {
    if (!getCursor) return;
    nextTick(() =>
        getCursor('items').update(todos => todos.filter(todo => !todo.get('completed'))));
}

export function removeTodo(id) {
    if (!getCursor) return;
    nextTick(() =>
        getCursor('items').delete(id));
}

export function addTodo(title) {
    if (!getCursor) return;
    if (title) {
        nextTick(() =>
            getCursor('items').set(uuid.v4(), immutable.fromJS({title, completed: false})));
    }
}

export function updateTodo(todoId, title) {
    if (!getCursor) return;
    nextTick(() => {
        let items = getCursor('items');
        if (items.has(todoId)) {
            items.setIn([todoId, 'title'], title);
        }
    });
}

export function _init(structure) {
    getCursor = (keyOrPath = []) => structure.cursor([].concat(keyOrPath));
}
