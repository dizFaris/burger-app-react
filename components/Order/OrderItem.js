import classes from "../../styles/OrderItem.module.css";

function OrderItem(props) {
  const price = `$${props.price}`;

  return (
    <li>
      <div className={classes.orderItem}>
        <div className={classes.summary}>
          <h2>{props.name}</h2>
          <span className={classes.price}>{price}</span>
        </div>
        <div className={classes.actions}>
          <span className={classes.amount}>x {props.amount}</span>
          <button onClick={props.onRemove}>-</button>
          <button onClick={props.onAdd}>+</button>
        </div>
      </div>
    </li>
  );
}

export default OrderItem;
