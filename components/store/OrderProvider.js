import OrderContext from "./order-context";
import { useReducer } from "react";

const defaultOrderState = {
  items: [],
  totalAmount: 0,
};

const orderReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const existingOrderItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    const existingOrderItem = state.items[existingOrderItemIndex];

    let updatedItems;

    if (existingOrderItem) {
      const updatedItem = {
        ...existingOrderItem,
        amount: existingOrderItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingOrderItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === "REMOVE") {
    const existingOrderItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingOrderItem = state.items[existingOrderItemIndex];
    const updatedTotalAmount = state.totalAmount - existingOrderItem.price;

    let updatedItems;
    if (existingOrderItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = {
        ...existingOrderItem,
        amount: existingOrderItem.amount - 1,
      };
      updatedItems = [...state.items];
      updatedItems[existingOrderItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "CLEAR") {
    return {
      items: [],
      totalAmount: 0,
    };
  }

  return defaultOrderState;
};

function OrderProvider(props) {
  const [orderState, dispatchOrderAction] = useReducer(
    orderReducer,
    defaultOrderState
  );

  const addItemToOrderHandler = (item) => {
    dispatchOrderAction({ type: "ADD", item: item });
  };
  const removeItemFromOrderHandler = (id) => {
    dispatchOrderAction({ type: "REMOVE", id: id });
  };

  const clearOrderHandler = () => {
    dispatchOrderAction({ type: "CLEAR" });
  };

  const orderContext = {
    items: orderState.items,
    totalAmount: orderState.totalAmount,
    addItem: addItemToOrderHandler,
    removeItem: removeItemFromOrderHandler,
    clearOrder: clearOrderHandler,
  };

  return (
    <OrderContext.Provider value={orderContext}>
      {props.children}
    </OrderContext.Provider>
  );
}

export default OrderProvider;
