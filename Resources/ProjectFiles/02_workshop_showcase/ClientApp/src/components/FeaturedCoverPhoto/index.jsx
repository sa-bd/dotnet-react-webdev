import React from "react";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router";
import useStyles from "../../styles/featured_cover_photo";

export default function FeaturedCoverPhoto(props) {
  const classes = useStyles();
  const { post } = props;
  const history = useHistory();

  return (
    <Paper
      className={classes.mainFeaturedPost}
      style={{ backgroundImage: `url(${post.image})` }}
    >
      <img style={{ display: "none" }} src={post.image} alt="featured post" />
      <div className={classes.overlay} />
      <Grid container>
        <Grid item md={6}>
          <div className={classes.mainFeaturedPostContent}>
            <Typography component="h1" gutterBottom align="left">
              {post.title}
            </Typography>
            <Typography variant="h5" component="h5" paragraph align="left">
              {post.description}
            </Typography>
            <Button
              variant="contained"
              size="small"
              className={classes.button}
              onClick={() => {
                history.push("/login");
              }}
            >
              START POSTING
            </Button>
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
}

FeaturedCoverPhoto.propTypes = {
  post: PropTypes.object,
};
