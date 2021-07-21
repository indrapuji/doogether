export function addTodo(newTodo) {
  return { type: "ADDTODO", payload: newTodo };
}
