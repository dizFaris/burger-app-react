import classes from "../../styles/AboutPage.module.css";
import background from "../../images/burger_front.jpg";
import ourStory from "../../images/ourStory.jpg";
import foodtruck from "../../images/foodtruck.jpg";
import burger from "../../images/burger.jpg";
import stamp from "../../images/beefStamp.png";
import Image from "next/image";
import ContactItem from "../../components/UI/ContentItem";
import React, { useEffect, useState } from "react";

function AboutPage() {
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWindowSize(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowSize]);

  return (
    <div className={classes.background}>
      <div>
        <Image src={background} alt="header" className={classes.image} />
      </div>

      <div className={classes.top}>
        <Image src={stamp} alt="" className={classes.topImage} />
      </div>
      <ContactItem
        imageLeft={true}
        title="Our Story"
        details={`At our burger store, we believe that food should be simple, delicious, and made with high-quality ingredients. That's why we've made it our mission to serve up the best burgers in town, using only the freshest beef, locally-sourced produce, and homemade sauces.`}
        image={ourStory}
      />
      <ContactItem
        imageLeft={windowSize > 899 ? false : true}
        title="The journey"
        details={`Our journey started in a small food truck, where we quickly gained a reputation for our juicy burgers and friendly service. As word spread, we knew it was time to expand, and we opened our first brick-and-mortar store in the heart of the city.`}
        image={foodtruck}
      />
      <ContactItem
        imageLeft={true}
        title="Because you deserve only the best!"
        details={`Since then, we've continued to grow and innovate, always staying true to our roots and our commitment to quality. Whether you're in the mood for a classic cheeseburger, a mouth-watering garlic lovers burger, a spicy western cheeseburger, or a flavorful salmon burger, we've got you covered.`}
        image={burger}
      />
    </div>
  );
}

export default AboutPage;
