import Image from "next/image";
import logo from "../images/logoMain.png";
import classes from "../styles/Footer.module.css";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { useRef, useState } from "react";

function Footer(props) {
  const emailInputRef = useRef("");
  const [emailValid, setEmailValid] = useState(true);

  const formSubmissionHandler = (event) => {
    event.preventDefault();
    const email = emailInputRef.current.value;
    const emailRegex =
      /[a-zA-Z0-9.]*@([a-zA-Z0-9]*.[a-z]*|[a-zA-Z0-9]*.[a-z]*)/;

    if (!emailRegex.test(email)) {
      setEmailValid(false);
      return;
    }

    setEmailValid(true);
    emailInputRef.current.value = "";
    event.preventDefault();
    props.modalShow();
  };

  return (
    <div className={classes.footer}>
      <div className={classes.links}>
        <Image src={logo} alt="" className={classes.footerLogo} />
        <div>
          <a href="https://www.facebook.com/" target="_blank">
            <FaFacebook />
          </a>
          <a href="https://twitter.com/" target="_blank">
            <FaTwitter />
          </a>
          <a href="https://www.instagram.com/" target="_blank">
            <FaInstagram />
          </a>

          <p>Made by Faris Dizdarevic as a React practice project</p>
        </div>
      </div>

      <div className={classes.contact}>
        <h3>Contact Us</h3>
        <p>hotbuns@gmail.com</p>
        <p>Europe</p>
      </div>

      <div className={classes.subscription}>
        <h3>Subscribe Now</h3>
        <p>Subsribe to our newsletter for new burger-rrific experiences!</p>
        <form onSubmit={formSubmissionHandler}>
          <label htmlFor="email">Your Email:</label>
          <input
            type="text"
            id="email"
            placeholder="Enter your email address"
            ref={emailInputRef}
          />
          {!emailValid && (
            <p className={classes.error}>Please enter a valid email.</p>
          )}
          <button>Subscribe</button>
        </form>
      </div>
    </div>
  );
}

export default Footer;
