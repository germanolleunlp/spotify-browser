import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

import SearchResultImage from "./SearchResultImage";
import Typography from "./Typography";

const useStyles = makeStyles((theme) => ({
  item: {
    width: 200,
    margin: theme.spacing(1),
    textDecoration: "none",
    [theme.breakpoints.down("sm")]: {
      width: 150,
    },
    [theme.breakpoints.down("xs")]: {
      width: 100,
    },
    [theme.breakpoints.up("md")]: {
      width: 200,
    },
    [theme.breakpoints.up("lg")]: {
      width: 300,
    },
  },
  info: {
    display: "flex",
    flexFlow: "column nowrap",
    textAlign: "center",
    justifyContent: "center",
  },
  subtitle1: {
    letterSpacing: "-.005em",
    fontWeight: 900,
  },
  subtitle2: {
    letterSpacing: ".015em",
  },
  default: {
    color: `${theme.palette["bg-default"].main}`
  }
}));

const SearchResultItem = ({
  href,
  image,
  name,
  icon,
  title,
  subtitle,
  ...attrs
}) => {
  const classes = useStyles();

  return (
    <a
      href={href}
      className={classes.item}
      rel="noopener noreferrer"
      target="_blank"
      {...attrs}
    >
      <SearchResultImage image={image} name={name} icon={icon} />
      <Box className={classes.info}>
        <Typography
          figma={"figma-typography-text-1"}
          className={clsx(classes.default)}
          noWrap
          data-testid="search-result-item-title"
        >
          {title}
        </Typography>
        <Typography
          figma={"figma-typography-text-2"}
          className={clsx(classes.default)}
          noWrap
          data-testid="search-result-item-subtitle"
        >
          {subtitle}
        </Typography>
      </Box>
    </a>
  );
};

SearchResultItem.propTypes = {
  href: PropTypes.string.isRequired,
  image: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }),
  name: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};

SearchResultItem.defaultProps = {
  image: null,
};

export default SearchResultItem;
