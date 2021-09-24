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
import { GET_AUTH, POST_AUTH } from "../../api/api";
import errorHandling from "../../utils/error_handling";
import Alert from "../../components/AlertCustom";
import SelectTextInputLayout from "../../components/SelectTextInputLayout";

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
  const [alert, setAlert] = React.useState(null);

  console.log(id);

  useEffect(() => {
    const exe = async () => {
      try {
        const { data } = await GET_AUTH(`post/auth/${id}`);
        setForm(data);
        setPreviewUrl(data.coverPhotoPreview);
        setLoading(false);
        console.log(data);
        if (image) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setPreview(reader.result);
          };
          reader.readAsDataURL(image);
        } else {
          setPreview(null);
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
    exe();
  }, [image, id]);

  const onEditPost = async (e) => {
    e.preventDefault();
    form.coverPhoto = image;
    console.log(form);
    try {
      var formData = new FormData();
      formData.append("id", id);
      formData.append("title", form.title);
      formData.append("category", form.category);
      formData.append("description", form.description);
      formData.append("coverPhoto", image);
      formData.append("coverPhotoPreview", form.coverPhotoPreview);

      const { data } = await POST_AUTH("post/auth/edit", formData);
      console.log(data);

      if (data.statusCode === 200) {
        setAlert(null);
        window.location.reload();
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

  const onInputChange = (event) => {
    const { value, name } = event.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

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

              <SelectTextInputLayout
                placeholder="Select category"
                value={form ? form.category : ""}
                onInputChange={onInputChange}
                list={categoryList}
                name="category"
                setSelectedValue={setForm}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="description"
                defaultValue={form ? form.description : ""}
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
                onClick={onEditPost}
              >
                Edit Post
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
      <Footer />
    </div>
  );
}
