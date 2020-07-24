import React, { useState } from "react";
import clsx from "clsx";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

import Button from "./Button";
import Typography from "./Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexFlow: "column nowrap",
    alignItems: "center",
  },
  button: {
    marginTop: theme.spacing(3),
  },
  buttonText: {
    color: theme.palette.common.white,
  },
}));

const useInputStyles = makeStyles((theme) => ({
  root: {
    overflow: "hidden",
    borderRadius: "30px",
    border: `solid 1px ${theme.palette.common.white}`,
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey.main,
    "&:hover": {
      backgroundColor: theme.palette.grey.main,
    },
    "&$focused": {
      backgroundColor: theme.palette.grey.main,
    },
  },
  input: {
    padding: `0 ${theme.spacing(4)}px`,
    fontSize: theme.typography.h5.fontSize,
    letterSpacing: "-.005em",
    fontWeight: 900,
    caretColor: theme.palette.primary.main,
    boxSizing: "border-box",
    color: theme.palette.common.white,
    "&::placeholder": {
      color: theme.palette.common.white,
    },
    "&::selection": {
      background: theme.palette.primary.main,
    },
  },
  focused: {},
  textfield: {
    width: "40%",
    margin: "4%",
  },
}));

const SearchInput = ({ queryTerm, search }) => {
  const classes = useStyles();
  const inputClasses = useInputStyles();

  const [value, setValue] = useState(queryTerm);

  const handleSubmit = (event) => {
    event.preventDefault();
    search(value);
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <form
      className={classes.root}
      onSubmit={handleSubmit}
      data-testid="search-input-form"
    >
      <TextField
        id="search"
        placeholder="Start typing here..."
        onChange={handleChange}
        value={value}
        className={inputClasses.textfield}
        InputProps={{ classes: inputClasses, disableUnderline: true }}
        // eslint-disable-next-line react/jsx-no-duplicate-props
        inputProps={{
          "data-testid": "search-input",
        }}
        autoFocus
        required
      />
      <Button
        className={clsx(classes.button)}
        type="submit"
        data-testid="search-submit-button"
      >
        <Typography variant="subtitle1" className={clsx(classes.buttonText)}>
          Go
        </Typography>
      </Button>
    </form>
  );
};

export default SearchInput;
