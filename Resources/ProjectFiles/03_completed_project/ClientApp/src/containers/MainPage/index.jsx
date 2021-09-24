import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import FeaturedCoverPhoto from "../../components/FeaturedCoverPhoto";
import { Typography } from "@material-ui/core";
import PostCard from "../../components/PostCard";
import useStyles from "../../styles/main";
import { GET } from "../../api/api";

const headerTitle = {
  title: "Title of a longer featured blog post",
  description:
    "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
  image:
    "https://images.unsplash.com/photo-1545239351-ef35f43d514b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=967&q=80",
};

export default function BlogPage() {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(true);
  const [posts, setPosts] = React.useState([]);

  useEffect(() => {
    setLoading(false);
    const exe = async () => {
      try {
        const { data } = await GET(`post/posts`);
        console.log(data);
        setPosts(data);
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
          <FeaturedCoverPhoto post={headerTitle} />
          <Typography component="h3" align="left" className={classes.section}>
            What People are sharing across the globe
          </Typography>
          <Container className={classes.cardGrid} maxWidth="lg">
            <Grid container spacing={4}>
              {posts.map((post) => (
                <Grid item key={post.id} xs={12} sm={6} md={4}>
                  <PostCard
                    id={post.id}
                    title={post.title}
                    description={post.description.substring(0, 100)}
                    cover={post.coverPhotoPreview}
                  />
                </Grid>
              ))}
            </Grid>
          </Container>
        </main>
      </Container>
      <Footer />
    </div>
  );
}
