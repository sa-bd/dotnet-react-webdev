import React from "react";
import Container from "@material-ui/core/Container";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Typography } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import useStyles from "../../styles/sign_in";
import { TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { Link } from "@material-ui/core";

export default function SignInPage() {
  const classes = useStyles();
  const [form, setForm] = React.useState(null);

  const onInputChange = (event) => {
    const { value, name } = event.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    console.log(form);
  };

  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
        <Header title="Blog" button="Sign Up" buttonUrl="/signup" />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography component="h2" style={{ color: "var(--black)" }}>
              Login
            </Typography>
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                onChange={onInputChange}
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                inputProps={{
                  style: {
                    fontSize: "var(--font-size-h6)",
                    color: "var(--darkash)",
                    fontFamily: "var(--font)",
                  },
                }} // font size of input text
                InputLabelProps={{
                  style: {
                    color: "var(--darkash)",
                    fontFamily: "var(--font)",
                  },
                }} // font size of input label
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                onChange={onInputChange}
                id="password"
                autoComplete="current-password"
                inputProps={{
                  style: {
                    fontSize: "var(--font-size-h6)",
                    color: "var(--darkash)",
                    fontFamily: "var(--font)",
                  },
                }} // font size of input text
                InputLabelProps={{
                  style: {
                    color: "var(--darkash)",
                    fontFamily: "var(--font)",
                  },
                }} // font size of input label
              />

              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={onSubmit}
              >
                Login
              </Button>

              <Link href="/signup" variant="h6" className={classes.link}>
                Don't have an account?{" "}
                <span style={{ fontWeight: "bold" }}>Sign Up</span>
              </Link>
            </form>
          </Paper>
        </main>
      </Container>
      <Footer
        title="Footer"
        description="Something here to give the footer a purpose!"
      />
    </div>
  );
}
