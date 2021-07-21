const initialState = {
  todo: [],
};

function reducer(state = initialState, action) {
  if (action.type === "ADDTODO") {
    return { ...state, todo: state.todo.concat(action.payload) };
  } else if (action.type === "DELTODO") {
    return { ...state, todo: state.todo.filter((item) => item.title !== action.payload) };
  }
  return state;
}

export default reducer;
