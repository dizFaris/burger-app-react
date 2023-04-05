import Image from "next/image";
import classes from "../styles/PulsingImage.module.css";

function PulsingImage(props) {
  return <Image src={props.image} alt="" className={classes.image} />;
}

export default PulsingImage;
