import React from "react";

const OrderContext = React.createContext({
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
  clearOrder: () => {},
});

export default OrderContext;
