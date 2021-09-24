import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Typography } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import EventIcon from "@material-ui/icons/Event";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import useStyles from "../../styles/post";
import { useParams } from "react-router";
import { GET } from "../../api/api";

export default function PostPage() {
  const classes = useStyles();
  const { id } = useParams();
  const [loading, setLoading] = React.useState(true);
  console.log(id);
  const [post, setPost] = React.useState(null);

  useEffect(() => {
    setLoading(false);
    const exe = async () => {
      try {
        const { data } = await GET(`post/${id}`);
        console.log(data);
        setPost(data);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    exe();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
        <Header button="Sign in" buttonUrl="/login" />
        <main>
          <Paper
            className={classes.coverPhoto}
            style={{
              backgroundImage: `url(${post ? post.coverPhotoPreview : ""})`,
            }}
          >
            <img
              style={{ display: "none" }}
              src={post ? post.coverPhotoPreview : ""}
              alt="featured post"
            />
            <div className={classes.overlay} />
          </Paper>
          <Typography component="h3" align="left" className={classes.section}>
            {post ? post.title : ""}
          </Typography>
          <Container className={classes.cardGrid} maxWidth="lg">
            <Grid container spacing={2}>
              <Grid item>
                <EventIcon fontSize="small" color="disabled" />
              </Grid>
              <Grid item>
                <Typography
                  component="h6"
                  align="left"
                  className={classes.section}
                  style={{ color: "var(--darkash)" }}
                >
                  {post ? post.createdAt : ""}
                </Typography>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item>
                <AccountCircleIcon fontSize="small" color="disabled" />
              </Grid>
              <Grid item>
                <Typography
                  component="h6"
                  align="left"
                  className={classes.section}
                  style={{ color: "var(--darkash)" }}
                >
                  {post ? post.author : ""}
                </Typography>
              </Grid>
            </Grid>

            <Typography
              component="h5"
              align="left"
              className={classes.section}
              style={{ color: "var(--black)", marginTop: "25px" }}
            >
              {post ? post.description : ""}
            </Typography>
          </Container>
        </main>
      </Container>
      <Footer />
    </div>
  );
}
