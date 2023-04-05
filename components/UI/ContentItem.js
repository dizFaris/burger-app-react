import classes from "../../styles/ContentItem.module.css";
import PulsingImage from "../PulsingImage";
function ContactItem(props) {
  return (
    <div className={classes.container}>
      <div className={classes.imageContainer}>
        <PulsingImage image={props.image} />
      </div>
      <div className={classes.contentContainer}>
        <h1>{props.title}</h1>
        <p>{props.details}</p>
      </div>
    </div>
  );
}

export default ContactItem;
