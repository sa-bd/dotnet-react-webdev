import { Alert, AlertTitle } from "@material-ui/lab";
import useStyles from "../../styles/alert_custom";

/**
 * A component that returns an alert view
 * @param severity 'error'|'info'|'success'|'warning'
 * @param title title text
 * @param message subtitle text
 */

const _Alert = (props) => {
  const classes = useStyles();

  return (
    <Alert severity={props.severity} className={classes.alert}>
      <AlertTitle className={classes.alertTitle}>{props.title}</AlertTitle>
      {props.severity === "success"
        ? ""
        : props.message.map((item, i) => {
            return <li key={i}>{item}</li>;
          })}
    </Alert>
  );
};
export default _Alert;
