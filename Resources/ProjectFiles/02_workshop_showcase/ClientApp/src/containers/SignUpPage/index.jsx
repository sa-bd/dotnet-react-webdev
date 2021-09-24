import React from "react";
import Container from "@material-ui/core/Container";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Typography } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import useStyles from "../../styles/sign_up";
import axios from "axios";

export default function SignUpPage() {
  const classes = useStyles();
  const [form, setForm] = React.useState(null);

  const onInputChange = (event) => {
    const { value, name } = event.target;
    console.log(value, name);
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    console.log(form);
    try {
      const { data } = await axios.post(
        `https://localhost:5001/user/register`,
        {
          name: form.name,
          email: form.email,
          password: form.password,
          confirmPassword: form.confirmPassword,
        }
      );

      console.log(data);
      if (data.statusCode === 200) {
        window.location.href = "/login";
      }
    } catch (e) {
      if (e.response) {
        const errors = e.response.data.errors;

        for (var key in errors) {
          if (errors.hasOwnProperty(key)) {
            console.log(errors[key]);
          }
        }
      } else {
        console.log("server didnt respond");
      }
    }
  };

  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
        <Header title="Blog" button="Sign in" buttonUrl="/login" />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography component="h2" style={{ color: "var(--black)" }}>
              Sign Up
            </Typography>
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                onChange={onInputChange}
                id="name"
                label="Enter name"
                name="name"
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
                onChange={onInputChange}
                id="email"
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
                onChange={onInputChange}
                label="Password"
                type="password"
                id="password"
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
                name="confirmPassword"
                label="Confirm password"
                type="password"
                onChange={onInputChange}
                id="confirmPassword"
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
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={onSubmit}
              >
                Sign up
              </Button>
              <Link href="/login" variant="h6" className={classes.link}>
                Already have an account?{" "}
                <span style={{ fontWeight: "bold" }}>Sign in</span>
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
