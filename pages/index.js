import React, { useEffect, useState } from "react";
import image from "../images/header_bg.jpg";
import Image from "next/image";
import classes from "../styles/HomePage.module.css";
import { Typewriter } from "react-simple-typewriter";
import logo from "../images/logoMain.png";
import HotItem from "../components/UI/HotItem";

function HomePage() {
  const [burgers, setBurgers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    const fetchBurgers = async () => {
      const response = await fetch(
        "https://burger-app-89388-default-rtdb.firebaseio.com/burgers.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseData = await response.json();
      const loadedBurgers = [];

      for (const key in responseData) {
        loadedBurgers.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          image: responseData[key].image,
          price: responseData[key].price,
        });
      }
      setBurgers(loadedBurgers);
      setIsLoading(false);
    };

    fetchBurgers().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  let renderItem;

  if (isLoading) {
    renderItem = <div className={classes.spinner}></div>;
  } else if (httpError) {
    renderItem = (
      <section className={classes.errorText}>
        <p>Error loading items ({httpError})</p>
      </section>
    );
  } else {
    renderItem = burgers
      .map((burger) => (
        <HotItem
          id={burger.id}
          name={burger.name}
          description={burger.description}
          image={burger.image}
          price={burger.price}
        />
      ))
      .slice(0, 3);
  }

  return (
    <React.Fragment>
      <div>
        <Image src={image} alt="header" className={classes.image} />
      </div>
      <div className={classes.container}>
        <div className={classes.typewriter}>
          <Typewriter
            words={[
              "Welcome to Hot Buns",
              "The best online burger store",
              "We do burgers the right way...",
              "Flame-grilled, juicy, and full of flavor",
            ]}
            loop={true}
            cursor
            cursorStyle="|"
            typeSpeed={50}
            deleteSpeed={70}
            delaySpeed={1000}
          />
        </div>
        <Image src={logo} alt="Hot buns logo" className={classes.logo} />
        <h2 className={classes.headingParagraph}>The beef you can't resist</h2>
      </div>
      {renderItem}
    </React.Fragment>
  );
}

export default HomePage;
