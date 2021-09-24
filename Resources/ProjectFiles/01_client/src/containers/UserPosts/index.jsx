import React, { useEffect } from "react";
import Container from "@material-ui/core/Container";
import Footer from "../../components/Footer";
import { Typography } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import PostCardUserView from "../../components/PostCardUserView";
import HeaderPrivate from "../../components/HeaderPrivate";
import useStyles from "../../styles/user_posts";

export default function PostPage() {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(true);
  const [userPosts, setUserPosts] = React.useState([]);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) return <h5>Loading...</h5>;

  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
        <HeaderPrivate />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography component="h3" align="left" className={classes.section}>
              My Posts
            </Typography>
            {userPosts.map((post) => (
              <div key={post.id} style={{ marginTop: "15px" }}>
                <PostCardUserView post={post} />
              </div>
            ))}
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
