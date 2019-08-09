import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import uuidv4 from 'uuid/v4';

import TodosContext from '../context';

export default function TodoForm() {
  const [todo, setTodo] = useState('');
  const {
    state: { currentTodo = {} },
    dispatch
  } = useContext(TodosContext);

  useEffect(() => {
    if (currentTodo.text) {
      setTodo(currentTodo.text);
    } else {
      setTodo('');
    }
  }, [currentTodo.id, currentTodo.text]);

  const handleSubmit = async event => {
    event.preventDefault();
    if (currentTodo.text) {
      const response = await axios.patch(
        `https://hooks-api-cnoo580ji.now.sh/todos/${currentTodo.id}`,
        {
          text: todo
        }
      );
      dispatch({ type: 'UPDATE_TODO', payload: response.data });
    } else {
      const response = await axios.post(
        `https://hooks-api-cnoo580ji.now.sh/todos`,
        {
          id: uuidv4(),
          text: todo,
          complete: false
        }
      );
      dispatch({ type: 'ADD_TODO', payload: response.data });
    }
    setTodo('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center p-5">
      <input
        type="text"
        className="border-black border-solid border-2"
        onChange={event => setTodo(event.target.value)}
        value={todo}
      />
    </form>
  );
}
