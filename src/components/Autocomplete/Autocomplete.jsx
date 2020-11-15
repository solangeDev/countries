/* eslint-disable no-use-before-define */
import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import "./Autocomplete.scss";
import {
  fade,
  ThemeProvider,
  withStyles,
  makeStyles,
  createMuiTheme,
} from "@material-ui/core/styles";
import { InputAdornment } from "@material-ui/core";

const theme = createMuiTheme({
  overrides: {
    MuiFormControl: {
      root: {
        borderRadius: "4px !important",
      },
    },
    MuiPaper: {
      rounded: {
        borderRadius: "inherit !important",
      },
    },
  },
});

const CssTextField = withStyles({
  root: {
    "& .MuiOutlinedInput-adornedEnd": {
      paddingRight: "0",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "transparent",
      },
      "&:hover fieldset": {
        borderColor: "transparent",
      },
      "&.Mui-focused fieldset": {
        borderColor: "transparent",
      },
    },
  },
})(TextField);

export default function Searcher(props) {
  let leftAdornment = (
    <InputAdornment position="start">
      <i
        className={`fas fa-search ${
          props.theme
            ? `${props.data.className}__search-dark`
            : `${props.data.className}__search-light`
        }`}
      ></i>
    </InputAdornment>
  );
  if (!props.data.searchIcon) {
    leftAdornment = "";
  }
  return (
    <ThemeProvider theme={theme}>
      <div className={props.data.className}>
        <Autocomplete
          //disableClearable
          onInputChange={(event, newInputValue) => {
            props.handleChange(newInputValue);
          }}
          classes={{
            listbox: props.theme
              ? `${props.data.className}__root-dark`
              : `${props.data.className}__root-light`,
            option: props.theme
              ? `${props.data.className}__color-light`
              : `${props.data.className}__theme-light`,
          }}
          //open={true}
          options={props.data.options.map((option) => option.name)}
          value={props.data.value}
          name={props.data.name}
          renderInput={(params) => (
            <CssTextField
              {...params}
              classes={{
                root: props.theme
                  ? `${props.data.className}__root-dark`
                  : `${props.data.className}__root-light`,
              }}
              placeholder={props.data.placeholder}
              margin="normal"
              variant="outlined"
              InputProps={{
                ...params.InputProps,
                startAdornment: leftAdornment,
              }}
            />
          )}
        />
      </div>
    </ThemeProvider>
  );
}
