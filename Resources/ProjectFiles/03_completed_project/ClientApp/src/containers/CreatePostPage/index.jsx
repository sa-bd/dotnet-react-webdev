import React, { useEffect } from "react";
import Container from "@material-ui/core/Container";
import Footer from "../../components/Footer";
import { Typography } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import PublishIcon from "@material-ui/icons/Publish";
import HeaderPrivate from "../../components/HeaderPrivate";
import useStyles from "../../styles/create_post";
import SelectTextInputLayout from "../../components/SelectTextInputLayout";
import { POST_AUTH } from "../../api/api";
import errorHandling from "../../utils/error_handling";
import Alert from "../../components/AlertCustom";

const categoryList = [
  "Fashion",
  "Food",
  "Travel",
  "Music",
  "Art",
  "Animals",
  "Vehicles",
  "Entertainment",
  "Education",
];

export default function CreatePostPage() {
  const classes = useStyles();
  const [file, setFile] = React.useState(null);
  const [filename, setFilename] = React.useState(null);
  const [form, setForm] = React.useState(null);
  const [alert, setAlert] = React.useState(null);

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
    } else {
      console.log("no file selected");
    }
  }, [file]);

  const onInputChange = (event) => {
    const { value, name } = event.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const fileHandler = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFile(file);
      setFilename(file.name);
      console.log(file);
    } else {
      setFile(null);
      setFilename(null);
    }
  };

  const onCreatePost = async (e) => {
    e.preventDefault();
    form.coverPhoto = file;
    console.log(form);
    try {
      var formData = new FormData();
      formData.append("title", form.title);
      formData.append("category", form.category);
      formData.append("description", form.description);
      formData.append("coverPhoto", file);

      const { data } = await POST_AUTH("post/auth", formData);
      console.log(data);

      if (data.statusCode === 200) {
        setAlert(null);
        window.location.href = "/";
      }
    } catch (e) {
      console.log(e);
      if (e.response) {
        setAlert(errorHandling(e));
      } else {
        console.log("server didnt respond");
      }
    }
  };

  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
        <HeaderPrivate />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography component="h2" style={{ color: "var(--black)" }}>
              Create a Post
            </Typography>
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="title"
                label="Enter title"
                name="title"
                type="text"
                onChange={onInputChange}
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
                name="description"
                label="Enter post description"
                type="text"
                id="description"
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
              <SelectTextInputLayout
                placeholder="Select category"
                value={null}
                onInputChange={onInputChange}
                list={categoryList}
                name="category"
                setSelectedValue={setForm}
              />
              <div style={{ marginTop: "var(--margin-item-spacing)" }}>
                <input
                  accept="image/*"
                  className={classes.input}
                  id="contained-button-file"
                  required
                  type="file"
                  onChange={fileHandler}
                />
                <label htmlFor="contained-button-file">
                  <Button
                    variant="contained"
                    component="span"
                    fullWidth={true}
                    className={classes.buttonUpload}
                    startIcon={<PublishIcon />}
                  >
                    {file ? filename : "Upload cover photo"}
                  </Button>
                </label>
              </div>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={onCreatePost}
              >
                Create new post
              </Button>
              {alert && alert.status && (
                <Alert
                  severity={alert.severity}
                  title={alert.title}
                  message={alert.message}
                />
              )}
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
