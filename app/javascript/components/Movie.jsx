import React, { useState, useEffect } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import Link from "@material-ui/core/Link";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  contentWrapper: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  contentContainer: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  infoList: {
    listStyle: "none",
  },
}));

export default function Movie() {
  const classes = useStyles();
  const [data, setData] = useState();
  let { id } = useParams();
  let infoList = null;

  useEffect(() => {
    fetch(`http://localhost:3000/search/movie/${id}`)
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  const formatInfoList = (infoData) => {
    let list = [];
    for (const [key, value] of Object.entries(infoData)) {
      const infoItem = { key: key, value: value };
      if (key != ["Poster"]) list.push(infoItem);
    }

    return list;
  };

  if (data) {
    infoList = formatInfoList(data);
  }

  return (
    <>
      <CssBaseline />
      <main>
        <div className={classes.contentWrapper}>
          <Container maxWidth="md">
            <h1>{data?.Title}</h1>
          </Container>
        </div>
        <Container maxWidth="md">
          <Link component={RouterLink} to="/">
            {"<-- Back to search page"}
          </Link>
        </Container>
        <Container maxWidth="md" className={classes.contentContainer}>
          <Grid container direction="row">
            <Grid item key={data?.imdbID} xs={12} sm={6} md={4}>
              <img src={data?.Poster}></img>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <ul className={classes.infoList}>
                {infoList?.map((item) => (
                  <li key={item.key}>
                    <span>
                      <b>{item.key}:</b>
                      {` ${item.value}`}
                    </span>
                  </li>
                ))}
              </ul>
            </Grid>
          </Grid>
        </Container>
      </main>
    </>
  );
}
