import React, { useState, useEffect } from 'react';
import { FaTimesCircle, FaStar } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

const Input = () => {
  const [input, setInput] = useState('');
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');

  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem('todos'));
    if (items.length === 0 && savedItems && savedItems.length > 0) {
      setItems(savedItems);
    }

    if (filter === 'all') {
      setFilteredItems(items);
    } else if (filter === 'complete') {
      const completeItems = items.filter(item => item.checked === true);
      setFilteredItems(completeItems);
    } else if (filter === 'incomplete') {
      const incompleteItems = items.filter(item => !item.checked === true);
      setFilteredItems(incompleteItems);
    } else if (filter === 'important') {
      const importantItems = items.filter(item => item.important === true);
      setFilteredItems(importantItems);
    } else if (filter === 'completedTasks') {
      const clearCompleted = items.filter(item =>
        item.checked ? null : items
      );
      setItems(clearCompleted);
    }
  }, [filter, items]);

  function addItem() {
    if (!input) {
      alert('add item');
      return;
    }
    const item = {
      id: Math.floor(Math.random() * 1000),
      value: input
    };

    setItems([...items, item]);
    localStorage.setItem('todos', JSON.stringify([...items, item]));
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
    localStorage.setItem('todos', JSON.stringify(listItems));
  };

  const handleFavoriteCheck = id => {
    // alert('You favorited an item');

    const important = items.map(item =>
      item.id === id
        ? {
            ...item,
            important: !item.important
          }
        : item
    );
    setItems(important);
    localStorage.setItem('todos', JSON.stringify(important));
  };

  function deleteItem(id) {
    const itemToDelete = items.find(item => item.id === id); // Find the item to delete
    if (itemToDelete) {
      const newArray = items.filter(item => item.id !== id);
      localStorage.setItem('todos', JSON.stringify(newArray));
      alert(`You have removed "${itemToDelete.value}" from your list`);
      setItems(newArray);
    }
  }

  function handleComplete() {
    setFilter('complete');
  }

  function handleIncomplete() {
    setFilter('incomplete');
  }
  function handleAllItems() {
    setFilter('all');
  }
  function handleFavorite() {
    setFilter('important');
  }
  function handleClearCompleted() {
    setFilter('completedTasks');
  }
  // console.log(items.filter(user => user.value.includes(query)));

  return (
    <main className="vh-100 app">
      <div className="input-group flex-nowrap">
        <input
          type="text"
          className="form-control"
          placeholder="Todos..."
          // aria-label="Username"
          aria-describedby="addon-wrapping"
          onChange={e => setInput(e.target.value)}
          value={input}
        />
        <button className="border-0 todo-btn" onClick={() => addItem()}>
          Add Todo
        </button>
      </div>
      <div className="input-group flex-nowrap">
        <input
          type="text"
          placeholder="Search..."
          onChange={e => setQuery(e.target.value)}
          className="form-control"
        />
      </div>

      {/* <div className="d-flex">
        <input
          placeholder="Todos..."
          onChange={(e) => setInput(e.target.value)}
          type="text"
          value={input}
        />

      </div> */}

      <div>
        <ul>
          {filteredItems &&
            filteredItems
              .filter(itemss => itemss.value.toLowerCase().includes(query))
              .map(item => {
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

                    <FaTimesCircle
                      onClick={() => deleteItem(item.id)}
                      className="delete-button"
                    />
                    <FaStar
                      className="favorite-button"
                      onClick={() => handleFavoriteCheck(item.id)}
                    />
                  </li>
                );
              })}
        </ul>
        <p className="d-flex justify-content-center">
          {items.length === 0
            ? 'No todos'
            : `${items.length} list ${items.length === 1 ? 'item' : 'items'}`}
        </p>
      </div>
      <footer>
        <div className="footer-btns d-flex justify-content-center">
          <button onClick={handleAllItems} className="btn btn-primary mx-1">
            all
          </button>
          <button onClick={handleComplete} className="btn btn-primary mx-1">
            complete
          </button>
          <button onClick={handleIncomplete} className="btn btn-primary mx-1">
            Incomplete
          </button>
          <button onClick={handleFavorite} className="btn btn-primary mx-1">
            Important
          </button>
          <button
            onClick={handleClearCompleted}
            className="btn btn-primary mx-1"
          >
            Clear Completed
          </button>
        </div>
      </footer>
    </main>
  );
};
export default Input;
