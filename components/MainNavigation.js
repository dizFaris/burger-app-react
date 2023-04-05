import Link from "next/link";
import classes from "../styles/MainNavigation.module.css";
import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import Image from "next/image";
import image from "../images/logoHeader.png";
import buttonStyle from "../styles/Button.module.css";
import OrderContext from "./store/order-context";

function MainNavigation(props) {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const [isOpen, setisOpen] = useState(false);
  const router = useRouter();
  const orderCtx = useContext(OrderContext);
  const { items } = orderCtx;

  const isOpenHandler = () => {
    setisOpen(!isOpen);
  };

  const btnClasses = `${buttonStyle.button} ${
    btnIsHighlighted ? buttonStyle.bump : ""
  }`;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    const timer = setBtnIsHighlighted(true);
    setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <nav className={classes.header}>
      <Link href="/" className={classes.logo}>
        <Image src={image} alt="BurgerLogo" className={classes.logo} />
      </Link>

      <ul
        className={`${classes.navbar} ${
          isOpen ? classes.navbarActive : classes.navbar
        }`}
      >
        <li>
          <Link
            href="/"
            className={`${classes.link} ${
              router.pathname === "/" ? classes.active : ""
            }`}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className={`${classes.link} ${
              router.pathname === "/about" ? classes.active : ""
            }`}
          >
            About
          </Link>
        </li>
        <li>
          <Link
            href="/menu"
            className={`${classes.link} ${
              router.pathname === "/menu" ? classes.active : ""
            }`}
          >
            Menu
          </Link>
        </li>
        <li>
          <button className={btnClasses} onClick={props.onShowOrder}>
            Order
          </button>
        </li>
      </ul>

      <div className={classes.mobile}>
        <i
          id="bar"
          className={`${isOpen ? "fas fa-times" : "fas fa-bars"}`}
          onClick={isOpenHandler}
        ></i>
      </div>
    </nav>
  );
}

export default MainNavigation;
