import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
const Input = () => {
  const [input, setInput] = useState('');
  const [items, setItems] = useState([]);

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

  function filterItem() {
    const newItems = items.filter(item => item.checked);
    setItems(newItems);
  }

  function filterNotDone(event) {
    const newItems = items.filter(item => !item.checked);
    setItems(newItems);
  }
  function handleAllItems() {
    setItems(items);
  }
  return (
    <>
      <main className="vh-100 app">
        <div className="d-flex">
          <input
            placeholder="Todos..."
            onChange={e => setInput(e.target.value)}
            type="text"
            value={input}
          />
          <button
            className="bg-secondary text-white border-0"
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
                        ? { textDecoration: 'line-through', color: 'lightgray' }
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
      </main>

      <footer>
        <div className="footer-btns d-flex justify-content-center">
          <button onClick={handleAllItems}>all</button>
          <button onClick={filterItem}>complete</button>
          <button onClick={filterNotDone}>active</button>
        </div>
      </footer>
    </>
  );
};
export default Input;
