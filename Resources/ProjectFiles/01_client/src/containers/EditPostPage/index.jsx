import React, { useEffect } from "react";
import Container from "@material-ui/core/Container";
import Footer from "../../components/Footer";
import { Typography } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import EditIcon from "@material-ui/icons/Edit";
import HeaderPrivate from "../../components/HeaderPrivate";
import useStyles from "../../styles/edit_post";
import { useParams } from "react-router";

export default function EditPostPage() {
  const classes = useStyles();
  const [image, setImage] = React.useState(null);
  const [preview, setPreview] = React.useState(null);
  const [previewUrl, setPreviewUrl] = React.useState(
    "https://icon-library.com/images/add-image-icon-png/add-image-icon-png-15.jpg"
  );
  const [form, setForm] = React.useState(null);
  const { id } = useParams();
  const [loading, setLoading] = React.useState(true);
  console.log(id);

  const onInputChange = (event) => {
    const { value, name } = event.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    setLoading(false);
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(image);
    } else {
      setPreview(null);
    }
  }, [image]);

  const imageHandler = (event) => {
    const file = event.target.files[0];
    if (file && file.type.substr(0, 5) === "image") {
      setImage(file);
    } else {
      setImage(null);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
        <HeaderPrivate />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography
              component="h2"
              style={{ color: "var(--black)" }}
              align="center"
            >
              Edit Post
            </Typography>
            <div className={classes.imageContainer}>
              <Paper
                elevation={0}
                component="form"
                className={classes.avatarContainer}
              >
                <Avatar
                  variant="square"
                  src={previewUrl}
                  srcSet={preview}
                  className={classes.avatar}
                />
              </Paper>
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="icon-button-file"
                type="file"
                onChange={imageHandler}
              />
              <label htmlFor="icon-button-file">
                <IconButton
                  aria-label="upload picture"
                  component="span"
                  className={classes.avatarIconButton}
                >
                  <EditIcon style={{ color: "black" }} />
                </IconButton>
              </label>
            </div>
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
                autoFocus
                defaultValue={form ? form.title : ""}
                onChange={onInputChange}
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
                name="description"
                defaultValue={form ? form.title : ""}
                label="Enter post description"
                type="text"
                onChange={onInputChange}
                id="description"
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
              >
                Edit Post
              </Button>
            </form>
          </Paper>
        </main>
      </Container>
      <Footer />
    </div>
  );
}
