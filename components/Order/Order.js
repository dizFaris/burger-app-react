import classes from "../../styles/Order.module.css";
import { useContext, useState } from "react";
import OrderContext from "../store/order-context";
import OrderItem from "./OrderItem";
import Checkout from "./Checkout";
import Link from "next/link";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.closeOrder}></div>;
};

function Order(props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const [isCheckout, setIsCheckout] = useState(false);
  const orderCtx = useContext(OrderContext);

  const totalAmount = orderCtx.totalAmount;
  const hasItems = orderCtx.items.length > 0;

  const orderItemRemoveHandler = (id) => {
    orderCtx.removeItem(id);
  };

  const orderItemAddHandler = (item) => {
    orderCtx.addItem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);

    await fetch(
      "https://burgers-1e2e9-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: orderCtx.items,
          total: totalAmount,
        }),
      }
    );
    setIsSubmitting(false);
    setDidSubmit(true);
    orderCtx.clearOrder();
  };

  const orderItems = (
    <ul className={classes.orderItems}>
      {orderCtx.items.map((item) => (
        <OrderItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={orderItemRemoveHandler.bind(null, item.id)}
          onAdd={orderItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const addItemsLink = (
    <div className={classes.link}>
      <p>You haven't added any burgers yet</p>
      <Link
        href="/menu"
        className={classes.linkButton}
        onClick={props.onCloseOrder}
      >
        Add burgers
      </Link>
    </div>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button onClick={props.onCloseOrder} className={classes.button}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <div className={classes.order}>
      {!isCheckout && orderItems}
      {!hasItems && addItemsLink}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>${totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout
          onConfirm={submitOrderHandler}
          onCancel={props.onCloseOrder}
        />
      )}
      {!isCheckout && modalActions}
    </div>
  );

  const submittingContent = (
    <div className={classes.order}>
      <div className={classes.spinner}></div>
    </div>
  );

  const contentSubmitted = (
    <div className={classes.order}>
      <p>Successfully sent the order!</p>
      <div className={classes.actions}>
        <button onClick={props.onCloseOrder} className={classes.button}>
          Close
        </button>
      </div>
    </div>
  );

  return (
    <>
      <Backdrop closeOrder={props.onCloseOrder} />
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && submittingContent}
      {!isSubmitting && didSubmit && contentSubmitted}
    </>
  );
}

export default Order;
