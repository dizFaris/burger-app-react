import classes from "../../styles/MenuPage.module.css";
import image from "../../images/bestburgers.jpg";
import Image from "next/image";
import { useState, useEffect } from "react";
import MenuItem from "../../components/UI/MenuItem";

function MenuPage() {
  const [burgers, setBurgers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    const fetchBurgers = async () => {
      const response = await fetch(
        "https://burgers-1e2e9-default-rtdb.firebaseio.com/burgers.json"
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
    renderItem = burgers.map((burger) => (
      <MenuItem
        key={burger.id}
        id={burger.id}
        name={burger.name}
        image={burger.image}
        price={burger.price}
      />
    ));
  }

  return (
    <div className={classes.page}>
      <Image src={image} alt="" className={classes.image} />
      <div className={classes.menuItems}>{renderItem}</div>
    </div>
  );
}

export default MenuPage;
