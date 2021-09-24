import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import FeaturedCoverPhoto from "../../components/FeaturedCoverPhoto";
import { Typography } from "@material-ui/core";
import PostCard from "../../components/PostCard";
import useStyles from "../../styles/main";

const mainFeaturedPost = {
  title: "Title of a longer featured blog post",
  description:
    "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
  image:
    "https://images.unsplash.com/photo-1545239351-ef35f43d514b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=967&q=80",
};

const posts = [
  {
    id: "1",
    title: "How COVID is affecting the Economy",
    description:
      "Sed fringilla semper odio, in malesuada risus euismod at. Duis cursus mollis venenatis. Fusce mattis, turpis et ultricies posuere, neque est laoreet justo, vel porttitor libero turpis vel felis. Etiam nulla odio, venenatis ut ultrices ac, dictum blandit nisi. Duis a mi feugiat ante fermentum volutpat. Aenean ac bibendum massa. Praesent eu pharetra dolor, vitae egestas metus. Mauris ac pulvinar ex. Phasellus et rhoncus odio. Morbi vitae vulputate elit, at tempus leo. Aliquam rutrum elit nisi, vitae molestie libero tristique quis.",
    date: "Sun 23, 2021",
    author: "Fahim Arnob",
    cover: "https://picsum.photos/1200/800",
  },
  {
    id: "2",
    title: "How Walter White failed to deal drugs",
    description:
      "Sed fringilla semper odio, in malesuada risus euismod at. Duis cursus mollis venenatis. Fusce mattis, turpis et ultricies posuere, neque est laoreet justo, vel porttitor libero turpis vel felis. Etiam nulla odio, venenatis ut ultrices ac, dictum blandit nisi. Duis a mi feugiat ante fermentum volutpat. Aenean ac bibendum massa. Praesent eu pharetra dolor, vitae egestas metus. Mauris ac pulvinar ex. Phasellus et rhoncus odio. Morbi vitae vulputate elit, at tempus leo. Aliquam rutrum elit nisi, vitae molestie libero tristique quis.",
    date: "Sun 23, 2021",
    author: "Tashfiq Khan",
    cover: "https://picsum.photos/1200/800",
  },
  {
    id: "3",
    title: "How COVID is affecting the Economy",
    description:
      "Sed fringilla semper odio, in malesuada risus euismod at. Duis cursus mollis venenatis. Fusce mattis, turpis et ultricies posuere, neque est laoreet justo, vel porttitor libero turpis vel felis. Etiam nulla odio, venenatis ut ultrices ac, dictum blandit nisi. Duis a mi feugiat ante fermentum volutpat. Aenean ac bibendum massa. Praesent eu pharetra dolor, vitae egestas metus. Mauris ac pulvinar ex. Phasellus et rhoncus odio. Morbi vitae vulputate elit, at tempus leo. Aliquam rutrum elit nisi, vitae molestie libero tristique quis.",
    date: "Sun 23, 2021",
    author: "Zunayed Rahim",
    cover: "https://picsum.photos/1200/800",
  },
  {
    id: "4",
    title: "How COVID is affecting the Economy",
    description:
      "Sed fringilla semper odio, in malesuada risus euismod at. Duis cursus mollis venenatis. Fusce mattis, turpis et ultricies posuere, neque est laoreet justo, vel porttitor libero turpis vel felis. Etiam nulla odio, venenatis ut ultrices ac, dictum blandit nisi. Duis a mi feugiat ante fermentum volutpat. Aenean ac bibendum massa. Praesent eu pharetra dolor, vitae egestas metus. Mauris ac pulvinar ex. Phasellus et rhoncus odio. Morbi vitae vulputate elit, at tempus leo. Aliquam rutrum elit nisi, vitae molestie libero tristique quis.",
    date: "Sun 23, 2021",
    author: "Fahim Arnob",
    cover: "https://picsum.photos/1200/800",
  },
];

export default function BlogPage() {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
        <Header button="Sign in" buttonUrl="/login" />
        <main>
          <FeaturedCoverPhoto post={mainFeaturedPost} />
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
                    cover={post.cover}
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
