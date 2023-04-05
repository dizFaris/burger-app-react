import classes from "../../styles/ContentItem.module.css";
import PulsingImage from "../PulsingImage";
function ContactItem(props) {
  const contentRender = props.imageLeft ? (
    <div className={classes.imageLeft}>
      <div className={classes.imageContainerLeft}>
        <PulsingImage image={props.image} />
      </div>
      <div className={classes.contentContainerLeft}>
        <h1>{props.title}</h1>
        <p>{props.details}</p>
      </div>
    </div>
  ) : (
    <div className={classes.imageRight}>
      <div className={classes.contentContainerRight}>
        <h1>{props.title}</h1>
        <p>{props.details}</p>
      </div>
      <div className={classes.imageContainerRight}>
        <PulsingImage image={props.image} />
      </div>
    </div>
  );

  return contentRender;
}

export default ContactItem;
