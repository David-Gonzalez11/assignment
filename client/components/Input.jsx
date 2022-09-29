import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
const Input = () => {
  const [input, setInput] = useState('');
  const [items, setItems] = useState([]);
  // const [checked, settIsChecked] = useState(true);

  function addItem() {
    if (!input) {
      alert('add item');
      return;
    }
    const item = {
      id: Math.floor(Math.random() * 1000),
      value: input
      // checked: settIsChecked(true)

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
    const newItems = items.filter(item => item.checked ? 'hidden' : '');
    setItems(newItems);
  }

  function filterNotDone(event) {
    const newItems = items.filter(item => !item.checked ? 'hidden' : '');
    setItems(newItems);
  }
  function handleAllItems() {
    setItems(items);
  }

  return (
    <>
      <main className='vh-100'>
        <input placeholder="Todos..." onChange={e => setInput(e.target.value)} type="text" value={input} />
        <button className='bg-secondary text-white border-0' onClick={() => addItem()}>Add Todo</button>
        <div>
          <ul>
            {items.map(item => {
              return (
                <li key={item.id}>
                  <input type='checkbox' className='checkbox-round' onChange={() => handleCheck(item.id)}
/>
                  <label
                  style={item.checked ? { textDecoration: 'line-through' } : null}>
                    {item.value}
                  </label>
                  <button onClick={() => deleteItem(item.id)} className="delete-button">Delete</button>
                </li>
              );
            })}
          </ul>
        </div>
      </main>
      <footer className='bg-primary'>
        <p className='d-flex justify-content-center'>
          {items.length} list {length === 1 ? 'item' : 'items'}
        </p>
        <button onChange={handleAllItems}>Show All Items</button>
        <button onChange={filterItem}>CheckedItems</button>
        <button onChange={ filterNotDone }>Not done</button>
        <FaPlus />
      </footer>
    </>
  );

};
export default Input;
