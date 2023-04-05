import Image from "next/image";
import classes from "../../styles/HotItem.module.css";
import logo from "../../images/logoHeader.png";
import hotLogo from "../../images/hot.png";
import Link from "next/link";

function HotItem(props) {
  return (
    <div className={classes.item} id={props.id}>
      <div className={classes.itemImage}>
        <Image src={hotLogo} alt="" className={classes.hotLogo} />
        <Image
          src={props.image}
          alt="burger"
          className={classes.image}
          height={300}
          width={400}
        />
      </div>

      <div className={classes.description}>
        <div className={classes.header}>
          <h4>{props.name}</h4>
          <Image src={logo} alt="logoBurger" className={classes.logo} />
        </div>

        <p>{props.description}</p>

        <div className={classes.footer}>
          <p>Only for ${props.price}</p>
          <Link href={`/menu/${props.id}`} className={classes.button}>
            View more
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HotItem;
