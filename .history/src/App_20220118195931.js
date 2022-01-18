import React, { useState, useEffect } from "react";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
  faCircle,
  faCheckCircle,
  faPlus,
  faTrashAlt
} from "@fortawesome/free-solid-svg-icons";

const App = () => {
  // HINT: each "item" in our list names a name,
  // a boolean to tell if its been completed, and a quantity
  const [items, setItems] = useState([
    { itemName: "item 1", quantity: 1, price: 1020, isSelected: false },
    { itemName: "item 2", quantity: 3, price: 1000, isSelected: true },
    { itemName: "item 3", quantity: 2, price: 100, isSelected: false },
  ]);

  const [inputValue, setInputValue] = useState("");
  const [inputMoneyValue, setInputMoneyValue] = useState("");

  const [totalItemCount, setTotalItemCount] = useState(6);

  const handleAddButtonClick = () => {
    if (inputValue !== "") {
      const newItem = {
        itemName: inputValue,
        quantity: 1,
        isSelected: false,
      };

      const newItems = [...items, newItem];

      setItems(newItems);
      setInputValue("");
      calculateTotal();
    }
  };

  const handleQuantityIncrease = (index) => {
    const newItems = [...items];

    newItems[index].quantity++;

    setItems(newItems);
    calculateTotal();
  };

  const handleQuantityDecrease = (index) => {
    const newItems = [...items];

    newItems[index].quantity--;

    setItems(newItems);
    calculateTotal();
  };

  const toggleComplete = (index) => {
    const newItems = [...items];

    newItems[index].isSelected = !newItems[index].isSelected;

    setItems(newItems);
  };

  const calculateTotal = () => {
    const totalItemCount = items.reduce((total, item) => {
      return total + item.quantity;
    }, 0);

    setTotalItemCount(totalItemCount);
  };
  const handleCalculations = (event) => {
    items.isSelected ? console.log("asa"): console.log("sad");
  }

  return (
    <div className="app-background">
      <div className="main-container">
        <div className="add-item-box">
          <input
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            className="add-item-input"
            placeholder="Add item..."
          />
          <input
            value={inputMoneyValue}
            onChange={(event) => setInputMoneyValue(event.target.value)}
            className="add-item-input"
            placeholder="Price..."
          />
          <FontAwesomeIcon
            icon={faPlus}
            onClick={() => handleAddButtonClick()}
          />
        </div>
        <div className="item-list">
          {items.map((item, index) => (
            <div className="item-container">
              <div className="item-name" onClick={() => toggleComplete(index)}>
                {item.isSelected ? (
                  <>
                    <FontAwesomeIcon icon={faCheckCircle} />
                    <span className="completed">{item.itemName}</span>
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faCircle} />
                    <span>{item.itemName}</span>
                    <span className="price">Price :{item.price}</span>
                  </>
                )}
              </div>
              <div className="bin">
                <FontAwesomeIcon icon={faTrashAlt} />
              </div>
              <div className="quantity">
                <button>
                  <FontAwesomeIcon
                    icon={faChevronLeft}
                    onClick={() => handleQuantityDecrease(index)}
                  />
                </button>
                <span> {item.quantity} </span>
                <button>
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    onClick={() => handleQuantityIncrease(index)}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="total">Total: {totalItemCount}</div>
      </div>
    </div>
  );
};

export default App;
