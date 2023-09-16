import React, { useState, useEffect } from "react";
import { FaTimesCircle, FaStar } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { render } from "react-dom";

const Input = () => {
  const [input, setInput] = useState("");
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [filterText, setFilterText] = useState("");
  const [renderNumberItems, setRenderNumberItems] = useState(0);
  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem("todos"));
    if (items.length === 0 && savedItems && savedItems.length > 0) {
      setItems(savedItems);
    }

    if (filter === "all") {
      setFilteredItems(items);
    } else if (filter === "complete") {
      const completeItems = items.filter((item) => item.checked === true);
      setFilteredItems(completeItems);
    } else if (filter === "incomplete") {
      const incompleteItems = items.filter((item) => !item.checked === true);
      setFilteredItems(incompleteItems);
    } else if (filter === "important") {
      const importantItems = items.filter((item) => item.important === true);
      setFilteredItems(importantItems);
  
    } else if (filter === "completedTasks") {
      const clearCompleted = items.filter((item) =>
        item.checked ? null : items
      );
      setFilteredItems(clearCompleted);
      localStorage.setItem('todos', JSON.stringify(clearCompleted));

      // setItems(clearCompleted);
    }
  }, [filter, items]);

  function addItem() {
    if (!input) {
      alert("add item");
      return;
    }
    const item = {
      id: Math.floor(Math.random() * 1000),
      value: input,
    };

    setItems([...items, item]);
    setRenderNumberItems(items.length);
    localStorage.setItem("todos", JSON.stringify([...items, item]));
    setInput("");
  }

  const handleCheck = (id) => {
    const listItems = items.map((item) =>
      item.id === id
        ? {
            ...item,
            checked: !item.checked,
          }
        : item
    );
    setItems(listItems);
    setRenderNumberItems(items.length);

    localStorage.setItem("todos", JSON.stringify(listItems));
  };

  const handleFavoriteCheck = (id) => {
    // alert('You favorited an item');

    const important = items.map((item) =>
      item.id === id
        ? {
            ...item,
            important: !item.important,
          }
        : item
    );
    setItems(important);
    setRenderNumberItems(important.length);

    localStorage.setItem("todos", JSON.stringify(important));
  };

  function deleteItem(id) {
    const itemToDelete = items.find((item) => item.id === id); // Find the item to delete
    if (itemToDelete) {
      const newArray = items.filter((item) => item.id !== id);
      localStorage.setItem("todos", JSON.stringify(newArray));
      alert(`You have removed "${itemToDelete.value}" from your list`);
      setItems(newArray);
    }
  }

  function handleComplete() {
    setFilter("complete");
    setFilterText("completed Items");
  }

  function handleIncomplete() {
    setFilter("incomplete");
    setFilterText("incomplete items");
  }
  function handleAllItems() {
    setFilter("all");
  }
  function handleFavorite() {
    setFilter("important");
    setFilterText("favorite Items");
  }
  function handleClearCompleted() {
    setFilter("completedTasks");
  }
  // console.log(items.filter(user => user.value.includes(query)));
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addItem();
    }
  };
  return (
    <main className="vh-100 app">
      <div className="input-group flex-nowrap">
        <input
          type="text"
          className="form-control"
          placeholder="Todos..."
          // aria-label="Username"
          aria-describedby="addon-wrapping"
          onChange={(e) => setInput(e.target.value)}
          value={input}
          onKeyDown={handleKeyPress}
        />
        <button
          className="border-0 todo-btn"
          onClick={() => addItem()}
          type="submit"
          onKeyDown={(e) => console.log(e.key)}
        >
          Add Todo
        </button>
      </div>
      <div className="input-group flex-nowrap">
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => setQuery(e.target.value)}
          className="form-control"
        />
    

      <div>
        <input type="text" placeholder="Search..." onChange={e => setQuery(e.target.value)} className="search"/>
        <div className='d-flex footer-btns mt-3 justify-content-center'>
          <button onClick={handleAllItems} className="filter-btns">
            all
          </button>
          <button onClick={handleComplete} className="filter-btns">
            complete
          </button>
          <button onClick={handleIncomplete} className="filter-btns">
            Incomplete
          </button>
        </div>
        <ul className='width'>
          {filteredItems &&
            filteredItems
              .filter((itemss) => itemss.value.toLowerCase().includes(query))
              .map((item) => {
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
                          ? { textDecoration: "line-through", color: "gray" }
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
                      className={`favorite-button ${
                        item.important ? "favorite-on" : "favorite-off"
                      }`}
                      onClick={() => handleFavoriteCheck(item.id)}
                      style={
                        item.important ? { color: "green" } : { color: "" }
                      }
                      onChange={() => handleFavoriteCheck(item.id)}
                    />
                  </li>
                );
              })}
        </ul>
        <p className="d-flex justify-content-center">
          {filter === "all"
            ? `${items.length} list ${items.length === 1 ? "item" : "items"}`
            : filter === "incomplete"
            ? `${
                filteredItems.filter((item) => !item.checked).length
              } incomplete ${
                filteredItems.filter((item) => !item.checked).length === 1
                  ? "item"
                  : "items"
              }`
            : filter === "complete"
            ? `${
                filteredItems.filter((item) => !item.complete).length
              } item complete`
            : filter === "important"
            ? `${
                filteredItems.filter((item) => item.important).length
              } important item`
            : ""}
        </p>
      </div>
      <footer>
        <div className="footer-btns d-flex justify-content-center">
          {/* <button onClick={handleAllItems} className="filter-btns">
          <button onClick={handleAllItems} className="btn btn-primary mx-1">
            all
          </button>
          <button onClick={handleComplete} className="btn btn-primary mx-1">
            complete
          </button>
          <button onClick={handleIncomplete} className="btn btn-primary mx-1">
            Incomplete
          </button> */}
          <button onClick={handleFavorite} className="filter-btns">
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
