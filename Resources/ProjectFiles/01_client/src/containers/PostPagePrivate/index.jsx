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
import HeaderPrivate from "../../components/HeaderPrivate";

export default function PostPagePrivate() {
  const classes = useStyles();
  const { id } = useParams();
  const [loading, setLoading] = React.useState(true);
  console.log(id);

  const post1 = {
    id: "1",
    title: "How COVID is affecting the Economy",
    description:
      "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents. Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents. Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents. Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents. Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents. Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
    date: "Sun 23, 2021",
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
        <HeaderPrivate />
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
