import React from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  image: {
    width: "100%",
    borderRadius: "5%",
  },
  icon: {
    margin: "25%",
    color: theme.palette.secondary.main,
  },
}));

const SearchResultImage = ({ image, name, icon }) => {
  const classes = useStyles();

  if (image) {
    return (
      <img
        src={image.url}
        alt={name}
        className={classes.image}
        data-testid="search-result-image"
      />
    );
  }

  const iconWithStyles = React.cloneElement(icon, {
    className: classes.icon,
    "data-testid": "result-icon",
  });

  return iconWithStyles;
};

SearchResultImage.propTypes = {
  image: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }),
  name: PropTypes.string,
  icon: PropTypes.node.isRequired,
};

SearchResultImage.defaultProps = {
  image: null,
  name: "",
};

export default SearchResultImage;
