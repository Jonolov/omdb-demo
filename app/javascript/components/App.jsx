import React from "react";
import Routes from "../routes/Index";
import AppBar from "@material-ui/core/AppBar";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  appBar: {
    padding: "20px",
  },
}));

export default function App() {
  const classes = useStyles();

  return (
    <>
      <AppBar position="relative" className={classes.appBar}>
        <Typography variant="h6" color="inherit" noWrap>
          Jon's movies
        </Typography>
      </AppBar>
      {Routes}
    </>
  );
}
