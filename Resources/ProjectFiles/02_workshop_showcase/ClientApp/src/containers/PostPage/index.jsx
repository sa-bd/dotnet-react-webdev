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

export default function PostPage() {
  const classes = useStyles();
  const { id } = useParams();
  const [loading, setLoading] = React.useState(true);
  console.log(id);
  const post1 = {
    id: "1",
    title: "How COVID is affecting the Economy",
    description:
      "Sed fringilla semper odio, in malesuada risus euismod at. Duis cursus mollis venenatis. Fusce mattis, turpis et ultricies posuere, neque est laoreet justo, vel porttitor libero turpis vel felis. Etiam nulla odio, venenatis ut ultrices ac, dictum blandit nisi. Duis a mi feugiat ante fermentum volutpat. Aenean ac bibendum massa. Praesent eu pharetra dolor, vitae egestas metus. Mauris ac pulvinar ex. Phasellus et rhoncus odio. Morbi vitae vulputate elit, at tempus leo. Aliquam rutrum elit nisi, vitae molestie libero tristique quis.",
    date: "Sun 23, 2021",
    author: "Fahim Arnob",
    cover: "https://picsum.photos/1200/800",
  };
  const [post, setPost] = React.useState(post1);

  useEffect(() => {
    setLoading(false);
  }, [post]);

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
              backgroundImage: `url(${post.cover})`,
            }}
          >
            <img
              style={{ display: "none" }}
              src={post.cover}
              alt="featured post"
            />
            <div className={classes.overlay} />
          </Paper>
          <Typography component="h3" align="left" className={classes.section}>
            {post.title}
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
                  {post.date}
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
                  {post.author}
                </Typography>
              </Grid>
            </Grid>

            <Typography
              component="h5"
              align="left"
              className={classes.section}
              style={{ color: "var(--black)", marginTop: "25px" }}
            >
              {post.description}
            </Typography>
          </Container>
        </main>
      </Container>
      <Footer />
    </div>
  );
}
