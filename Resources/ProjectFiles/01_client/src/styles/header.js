import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    title: {
      marginRight: theme.spacing(1),
      fontSize: "var(--font-size-brand) !important",
      cursor: "pointer",
    },
    navbar: {
      flex: 1,
      justifyContent: "left",
      textAlign: "left",
    },
    navbarItems: {
      marginLeft: theme.spacing(3),
      padding: theme.spacing(1),
      fontFamily: "var(--font)",
      fontSize: "var(--font-size-navbar)",
    },
    toolbarSecondary: {
      justifyContent: "space-between",
      overflowX: "auto",
    },
    toolbarLink: {
      padding: theme.spacing(1),
      flexShrink: 0,
    },
    button: {
      fontFamily: "var(--font)",
      fontSize: "var(--font-size-button)",
    },
    toolbar: {
      paddingRight: 0,
      paddingLeft: 0,
    },
  }));

  export default useStyles;