import { useEffect, useReducer } from 'react';
import { todoReducer } from '../08-useReducer/todoreducer';

//Declaración del initialState para el Reducer
// const initialState = [
// {
//   id: new Date().getTime(),
//   description: 'Recolectar la piedra del alma',
//   done: false,
// },
// ];

const init = () => {
  return JSON.parse(localStorage.getItem('todos')) || [];
};

export const useTodos = () => {
  const [todos, dispatch] = useReducer(todoReducer, [], init);
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleNewTodo = (todo) => {
    const action = {
      type: '[TODO] Add Todo',
      payload: todo,
    };
    dispatch(action);
  };

  const handleDeleteTodo = (id) => {
    dispatch({
      type: '[TODO] Remove Todo',
      payload: id,
    });
  };
  const handleToggleTodo = (id) => {
    dispatch({
      type: '[TODO] Toggle Todo',
      payload: id,
    });
  };
  return {
    todos,
    handleNewTodo,
    handleDeleteTodo,
    handleToggleTodo,
    pendingTodosCount: todos.filter((todo) => !todo.done).length,
    todosCount: todos.length,
  };
};
