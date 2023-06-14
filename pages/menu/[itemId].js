import image from "../../images/bestburgers.jpg";
import Image from "next/image";
import classes from "../../styles/MenuItemPage.module.css";
import React from "react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Link from "next/link";

function ItemPage() {
  const [burgers, setBurgers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();
  const router = useRouter();
  const id = router.query.itemId;

  useEffect(() => {
    const fetchBurgers = async () => {
      const response = await fetch(
        `https://burger-app-89388-default-rtdb.firebaseio.com/burgers/${id}.json`
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseData = await response.json();

      setBurgers(responseData);
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
    renderItem = burgers;
  }

  return (
    <React.Fragment>
      <Image src={image} alt="" className={classes.image} />
      <div className={classes.container}>
        <div className={classes.imageContainer}>
          <Image
            src={renderItem.image}
            alt=""
            className={classes.itemImage}
            width={200}
            height={200}
          />
        </div>
        <h1>{renderItem.name}</h1>
        <p>{renderItem.description}</p>
        <Link href="/menu" className={classes.button}>
          Back to menu
        </Link>
      </div>
    </React.Fragment>
  );
}

export default ItemPage;
