'use client';

import { useRef, useState } from 'react';
import { GroceryList } from "./entities/groceryList";

export default function Home() {
  const [groceryList, setGroceryList] = useState<GroceryList>({
    id: 1, title: 'newList', items: [
    ]
  });

  const inputRef = useRef<HTMLInputElement>(null);
  const handleCheckboxClick = (itemId: number) => {
    setGroceryList(prevList => ({
      ...prevList,
      items: prevList.items.map(item =>
        item.id === itemId ? { ...item, purchased: !item.purchased } : item
      )
    }));
  };
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleAddItem();
    }
  };
  function handleAddItem(): void {
    if (inputRef.current) {
      console.log(inputRef.current.value);
      const [item, quantity, price] = inputRef.current.value.split(' ');
      const newItem = {
        id: groceryList.items.length + 1,
        name: item,
        quantity: Number(quantity),
        purchased: false,
        price: Number(price)
      };
      setGroceryList(prevList => ({
        ...prevList,
        items: [...prevList.items, newItem]
      }));
      inputRef.current.value = '';
    }
  }

  return (
    <div className="container ml-3 flex-column">
      <h1>Lets go Cuyita make a list</h1>
      {groceryList.items.map((item) => (
        <ul key={groceryList.id} className="list-group ">
          <li className="list-group-item flex">purchased  name  quantity  price</li>
          <li key={item.id} className="list-group-item flex">
            <input
              type="checkbox"
              checked={item.purchased}
              onChange={() => handleCheckboxClick(item.id)}
            />
            <span className="ml-3 flex-row justify-content-between">
              {item.name}  {item.quantity}  {item.price}
            </span>
          </li>
        </ul>
      ))}

      <input type="text" id="newItemInput" ref={inputRef} className='flex' onKeyPress={handleKeyPress} />
      <button className="btn btn-primary flex bg-red" onClick={handleAddItem}>Add Item</button>
    </div>
  );
}