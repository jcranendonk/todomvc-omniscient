export function completedTodoCount(todos) {
    return todos.count(t => t.get('completed', false));
}

export function activeTodoCount(todos) {
    return todos.count(t => !t.get('completed', false));
}
