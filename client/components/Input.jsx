import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

const Input = () => {
  const [input, setInput] = useState('');
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState([]);

  function addItem() {
    if (!input) {
      alert('add item');
      return;
    }
    const item = {
      id: Math.floor(Math.random() * 1000),
      value: input
    };

    setItems(oldList => [...oldList, item]);
    setFilter(oldList => [...oldList, item]);
    setInput('');
  }

  const handleCheck = id => {
    const listItems = items.map(item =>
      item.id === id
        ? {
            ...item,
            checked: !item.checked
          }
        : item
    );
    setItems(listItems);
  };
  function deleteItem(id) {
    const newArray = items.filter(item => item.id !== id);
    setItems(newArray);
  }

  function handleActive() {
    const newItems = items.filter(item => item.checked === true);
    setFilter(newItems);
  }

  function handleIncomplete() {
    const newItems = items.filter(item => !item.checked);
    setFilter(newItems);
  }
  function handleAllItems() {
    setFilter(items);
  }

  return (
    <main className="vh-100 app">
      <div className="d-flex">
        <input
          placeholder="Todos..."
          onChange={e => setInput(e.target.value)}
          type="text"
          value={input}
        />
        <button
          className="bg-secondary text-white border-0 todo-btn"
          onClick={() => addItem()}
        >
          Add Todo
        </button>
      </div>

      <div>
        <ul>
          {items.map(item => {
            return (
              <li key={item.id}>
                <input
                  type="checkbox"
                  className="checkbox-round"
                  onChange={() => handleCheck(item.id)}
                />
                <label
                  style={
                    item.checked
                      ? { textDecoration: 'line-through', color: 'gray' }
                      : null
                  }
                >
                  {item.value}
                </label>
                <FaTrash
                  onClick={() => deleteItem(item.id)}
                  className="delete-button"
                />
                <hr />
              </li>
            );
          })}
        </ul>
        <p className="d-flex justify-content-center">
          {items.length} list {items.length === 1 ? 'item' : 'items'}
        </p>
      </div>
      <footer>
        <div className="footer-btns d-flex justify-content-center">
          <button onClick={handleAllItems}>all</button>
          <button onClick={handleActive}>complete</button>
          <button onClick={handleIncomplete}>Incomplete</button>
        </div>
      </footer>
    </main>
  );
};
export default Input;
