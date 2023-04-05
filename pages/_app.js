import "../styles/globals.css";
import MainNavigation from "../components/MainNavigation";
import Head from "next/head";
import Footer from "../components/Footer";
import Modal from "../components/Modal";
import { useState } from "react";
import Order from "../components/Order/Order";
import OrderProvider from "../components/store/OrderProvider";

function MyApp({ Component, pageProps }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [orderIsOpen, setOrderIsOpen] = useState(false);

  const showOrder = () => {
    setOrderIsOpen(true);
  };

  const closeOrder = () => {
    setOrderIsOpen(false);
  };

  const showModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <OrderProvider>
      <Head>
        <title>Hot buns</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
          crossorigin="anonymous"
          referrerpolicy="no-referrer"
        />
      </Head>
      <Modal show={modalIsOpen} closed={closeModal} />
      {orderIsOpen && <Order onCloseOrder={closeOrder} />}
      <MainNavigation onShowOrder={showOrder} />
      <Component {...pageProps} />
      <Footer modalShow={showModal} />
    </OrderProvider>
  );
}

export default MyApp;
