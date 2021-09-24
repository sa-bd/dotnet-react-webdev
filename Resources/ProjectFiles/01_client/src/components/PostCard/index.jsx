import { Card } from "@material-ui/core";
import { CardMedia } from "@material-ui/core";
import { CardContent } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { CardActions } from "@material-ui/core";
import { Button } from "@material-ui/core";
import useStyles from "../../styles/post_card";

const PostCard = (props) => {
  const classes = useStyles();

  return (
    <Card className={classes.card} elevation={0}>
      <CardMedia
        className={classes.cardMedia}
        image={props.cover}
        title="Image title"
      />
      <CardContent className={classes.cardContent}>
        <Typography gutterBottom component="h4">
          {props.title}
        </Typography>
        <Typography component="h6" style={{ color: "var(--darkash)" }}>
          {props.description}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button
          variant="outlined"
          size="small"
          className={classes.button}
          onClick={() => {
            window.location.href = `/blog/${props.id}`;
          }}
        >
          READ MORE
        </Button>
      </CardActions>
    </Card>
  );
};

export default PostCard;
