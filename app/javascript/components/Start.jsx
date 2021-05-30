import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import TextField from "@material-ui/core/TextField";
import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
}));

export default function Start(props) {
  const classes = useStyles();
  const [inputValue, setInputValue] = useState("");
  const [data, setData] = useState();
  let { title } = useParams();

  const fetchFromServer = (inputValue) => {
    fetch(`/search/movies/${inputValue}`)
      .then((response) => {
        if (response.status >= 200 && response.status <= 299) {
          return response.json();
        } else {
          throw Error(response.statusText);
        }
      })
      .then((data) => setData(data));
  };

  useEffect(() => {
    if (title) fetchFromServer(title);
  }, []);

  const handleSubmit = (e) => {
    fetchFromServer(inputValue);
    props.history.push(`/movies/${inputValue}`);
    e.preventDefault();
  };

  return (
    <>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Search for movies
            </Typography>
            <div className={classes.heroButtons}>
              <form
                onSubmit={handleSubmit}
                className={classes.root}
                noValidate
                autoComplete="off"
              >
                <Grid container spacing={2}>
                  <Grid item xs={9}>
                    <TextField
                      fullWidth
                      size="small"
                      id="outlined-basic"
                      label="Title"
                      variant="outlined"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Button
                      size="large"
                      type="submit"
                      variant="contained"
                      color="primary"
                    >
                      Search
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </div>
          </Container>
        </div>

        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {data?.Error ? (
              <div>No results found for {inputValue}</div>
            ) : (
              data?.Search.map((movie) => (
                <Grid item key={movie.imdbID} xs={12} sm={6} md={4}>
                  <Card className={classes.card}>
                    <CardMedia
                      className={classes.cardMedia}
                      image={movie.Poster}
                      title="Image title"
                    />
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {movie.Title}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Link
                        component={RouterLink}
                        to={`/movie/${movie.imdbID}`}
                      >
                        Read more
                      </Link>
                    </CardActions>
                  </Card>
                </Grid>
              ))
            )}
          </Grid>
        </Container>
      </main>
    </>
  );
}
