import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import EventIcon from "@material-ui/icons/Event";
import { Button } from "@material-ui/core";
import useStyles from "../../styles/post_card_private";

export default function PostCardUserView(props) {
  const classes = useStyles();
  const { post } = props;

  const onDeleteClick = () => {
    console.log("delete clicked");
    console.log(post.id);
  };

  return (
    <Grid item xs={12} md={6}>
      <Card className={classes.card} elevation={0}>
        <CardMedia
          className={classes.cardMedia}
          image={post.coverPhotoPreview}
          title="Image title"
        />
        <div className={classes.cardDetails}>
          <CardContent className={classes.cardContent}>
            <Typography component="h4" align="left">
              {post.title}
            </Typography>

            <div>
              <Grid container spacing={2}>
                <Grid item style={{ paddingRight: 0 }}>
                  <EventIcon
                    fontSize="small"
                    color="disabled"
                    style={{ marginTop: "5px" }}
                  />
                </Grid>
                <Grid item>
                  <Typography
                    component="h6"
                    align="left"
                    className={classes.section}
                    style={{ color: "var(--darkash)", marginTop: "5px" }}
                  >
                    {post.createdAt}
                  </Typography>
                </Grid>
              </Grid>
            </div>
            <Typography
              component="h6"
              color="textSecondary"
              align="left"
              style={{ color: "var(--darkash)", marginTop: "15px" }}
            >
              {post.description.substring(0, 150) + "..."}
            </Typography>

            <div style={{ textAlign: "left", marginTop: "10px" }}>
              <Button
                variant="contained"
                size="small"
                className={classes.button}
                style={{
                  backgroundColor: "var(--darkash)",
                  color: "var(--white)",
                }}
                onClick={() => {
                  window.location.href = `/edit/${post.id}`;
                }}
              >
                EDIT
              </Button>

              <Button
                variant="contained"
                size="small"
                className={classes.button}
                style={{
                  backgroundColor: "var(--white)",
                  color: "var(--black)",
                }}
                onClick={() => {
                  window.location.href = `/view/${post.id}`;
                }}
              >
                VIEW
              </Button>

              <Button
                variant="contained"
                size="small"
                className={classes.button}
                style={{
                  backgroundColor: "var(--red)",
                  color: "var(--white)",
                }}
                onClick={onDeleteClick}
              >
                DELETE
              </Button>
            </div>
          </CardContent>
        </div>
      </Card>
    </Grid>
  );
}

PostCardUserView.propTypes = {
  post: PropTypes.object,
};
