import React, { useState, useEffect } from "react";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
  faCircle,
  faCheckCircle,
  faPlus,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import NumberFormat from "react-number-format";

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
  const [totalMoneyCount, setTotalMoneyCount] = useState(6);

  const handleAddButtonClick = () => {
    if (inputValue && inputMoneyValue !== "") {
      const newItem = {
        itemName: inputValue,
        quantity: 1,
        price: inputMoneyValue,
        isSelected: false,
      };

      const newItems = [...items, newItem];

      setItems(newItems);
      setInputValue("");
      setInputMoneyValue("");
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

    if (newItems[index].quantity != 0) {
      newItems[index].quantity--;
    }

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
      console.log(item.quantity)
      return total + item.quantity;
    }, 0);

    setTotalItemCount(totalItemCount);
  };

const handleCalculations = () => {
  const totalItemCount = items.reduce((total, item) => {
    console.log(item.quantity);
    return total + item.quantity;
  }, 0);

  setTotalItemCount(totalItemCount);
};
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
            onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
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
                    <span className="price">
                      Price :{" "}
                      <NumberFormat
                        value={item.price}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={" Ksh."}
                      />
                    </span>
                  </>
                )}
              </div>
              <div className="icons">
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
                  <button>
                    <FontAwesomeIcon
                      icon={faChevronRight}
                      onClick={() => handleCalculations}
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="total">Number of items: {totalItemCount}</div>
        <div className="total">Number of items: {totalItemCount}</div>
      </div>
    </div>
  );
};

export default App;
