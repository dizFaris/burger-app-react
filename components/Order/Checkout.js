import classes from "../../styles/Checkout.module.css";
import { useRef, useState } from "react";

const validateEmail = (email) => {
  const emailRegex = /[a-zA-Z0-9.]*@([a-zA-Z0-9]*.[a-z]*|[a-zA-Z0-9]*.[a-z]*)/;

  return emailRegex.test(email);
};

const validatePhone = (phone) => {
  const phoneRegex = /^(\d{9}|\d{10})$/;

  return phoneRegex.test(phone);
};

const isEmpty = (value) => value.trim() === "";
const isValid = (value) => {
  const regex = /^[a-zA-Z\s]+$/;

  return value.trim().length > 2 && regex.test(value);
};

function Checkout(props) {
  const [formInputsValidity, setFormInputsValidity] = useState({
    firstName: true,
    lastName: true,
    address: true,
    phone: true,
    email: true,
  });

  const firstNameInputRef = useRef();
  const lastNameInputRef = useRef();
  const addressInputRef = useRef();
  const phoneInputRef = useRef();
  const emailInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredFirstName = firstNameInputRef.current.value;
    const enteredLastName = lastNameInputRef.current.value;
    const enteredAddress = addressInputRef.current.value;
    const enteredPhone = phoneInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;

    const enteredFirstNameIsValid =
      !isEmpty(enteredFirstName) && isValid(enteredFirstName);
    const enteredLastNameIsValid =
      !isEmpty(enteredLastName) && isValid(enteredLastName);
    const enteredAddressIsValid = !isEmpty(enteredAddress);
    const enteredPhoneIsValid =
      !isEmpty(enteredPhone) && validatePhone(enteredPhone);
    const enteredEmailIsValid =
      !isEmpty(enteredEmail) && validateEmail(enteredEmail);

    setFormInputsValidity({
      firstName: enteredFirstNameIsValid,
      lastName: enteredLastNameIsValid,
      address: enteredAddressIsValid,
      phone: enteredPhoneIsValid,
      email: enteredEmailIsValid,
    });

    const formIsValid =
      enteredFirstNameIsValid &&
      enteredLastNameIsValid &&
      enteredAddressIsValid &&
      enteredPhoneIsValid &&
      enteredEmailIsValid;

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      firstName: enteredFirstName,
      lastName: enteredLastName,
      address: enteredAddress,
      phone: enteredPhone,
      email: enteredEmail,
    });
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div
        className={`${classes.control} ${
          formInputsValidity.firstName ? "" : classes.invalid
        }`}
      >
        <label htmlFor="firstName">First Name</label>
        <input type="text" id="firstName" ref={firstNameInputRef} />
        {!formInputsValidity.firstName && <p>Please enter a valid name!</p>}
      </div>

      <div
        className={`${classes.control} ${
          formInputsValidity.lastName ? "" : classes.invalid
        }`}
      >
        <label htmlFor="lastName">Last Name</label>
        <input type="text" id="lastName" ref={lastNameInputRef} />
        {!formInputsValidity.lastName && <p>Please enter a valid last name!</p>}
      </div>

      <div
        className={`${classes.control} ${
          formInputsValidity.address ? "" : classes.invalid
        }`}
      >
        <label htmlFor="address">Address</label>
        <input type="text" id="address" ref={addressInputRef} />
        {!formInputsValidity.address && <p>Please enter a valid address!</p>}
      </div>

      <div
        className={`${classes.control} ${
          formInputsValidity.phone ? "" : classes.invalid
        }`}
      >
        <label htmlFor="phone">Phone</label>
        <input type="text" id="phone" ref={phoneInputRef} />
        {!formInputsValidity.phone && <p>Please enter a valid phone!</p>}
      </div>

      <div
        className={`${classes.control} ${
          formInputsValidity.email ? "" : classes.invalid
        }`}
      >
        <label htmlFor="email">Email</label>
        <input type="text" id="email" ref={emailInputRef} />
        {!formInputsValidity.email && <p>Please enter a valid email!</p>}
      </div>

      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
}

export default Checkout;
