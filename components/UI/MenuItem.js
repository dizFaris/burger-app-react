import Image from "next/image";
import classes from "../../styles/MenuItem.module.css";
import Link from "next/link";
import { useContext, useRef, useState } from "react";
import OrderContext from "../store/order-context";

function MenuItem(props) {
  const [value, setValue] = useState(0);
  const [amoutIsValid, setAmountIsValid] = useState(true);
  const orderCtx = useContext(OrderContext);

  const amountInputRef = useRef();

  const orderHandler = (event) => {
    event.preventDefault();

    const enteredAmount = +amountInputRef.current.value;

    if (enteredAmount < 1) {
      setAmountIsValid(false);
      return;
    }

    setAmountIsValid(true);
    orderCtx.addItem({
      id: props.id,
      name: props.name,
      price: +props.price,
      amount: enteredAmount,
    });
    setValue(0);
  };

  const handleInputChange = (event) => {
    const newValue = parseInt(event.target.value);
    setValue(Math.min(newValue, 30));
  };

  return (
    <form className={classes.menuItem}>
      <Image
        src={props.image}
        alt=""
        className={classes.image}
        height={200}
        width={200}
      />
      <div className={classes.container}>
        <div>
          <h3>{props.name}</h3>
          <p className={classes.menuItemParagraph}>Price ${props.price}</p>
        </div>

        <Link href={`/menu/${props.id}`} className={classes.button}>
          Details
        </Link>

        <div>
          <div className={classes.amount}>
            <label htmlFor="amount">Amount:</label>
            <input
              ref={amountInputRef}
              id="amount"
              type="number"
              min="0"
              max="30"
              value={value}
              onChange={handleInputChange}
            />
          </div>
          {!amoutIsValid && (
            <p className={classes.invalidAmount}>Invalid amount</p>
          )}
          <button class={classes.button} onClick={orderHandler}>
            Add to cart
          </button>
        </div>
      </div>
    </form>
  );
}

export default MenuItem;
