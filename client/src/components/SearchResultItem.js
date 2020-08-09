import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import clsx from "clsx";

import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

import FavButton from "./FavButton";
import UnfavButton from "./UnfavButton";
import SearchResultImage from "./SearchResultImage";
import Typography from "./Typography";

const useStyles = makeStyles((theme) => ({
  item: {
    display: "flex",
    flexFlow: "column nowrap",
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
  link: {
    textDecoration: "none",
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
    color: `${theme.palette["bg-default"].main}`,
  },
}));

const SearchResultItem = ({
  id,
  href,
  image,
  name,
  icon,
  title,
  subtitle,
  duration_ms,
  canAddToFav,
  favorites,
  ...attrs
}) => {
  const classes = useStyles();
  const inFav = favorites[id];

  return (
    <Box className={classes.item}>
      <a
        className={classes.link}
        href={href}
        rel="noopener noreferrer"
        target="_blank"
        {...attrs}
      >
        <SearchResultImage image={image} name={name} icon={icon} />
        <Box className={classes.info}>
          <Typography
            figma="figma-typography-text-1"
            className={clsx(classes.default)}
            noWrap
            data-testid="search-result-item-title"
          >
            {title}
          </Typography>
          <Typography
            figma="figma-typography-text-2"
            className={clsx(classes.default)}
            noWrap
            data-testid="search-result-item-subtitle"
          >
            {subtitle}
          </Typography>
        </Box>
      </a>
      {canAddToFav &&
        (!!inFav ? (
          <UnfavButton track={{ id, title }} />
        ) : (
          <FavButton
            track={{
              id,
              name: title,
              external_urls: { spotify: href },
              album: { name, images: [image] },
              duration_ms,
            }}
          />
        ))}
    </Box>
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
  canAddToFav: PropTypes.bool,
};

SearchResultItem.defaultProps = {
  image: null,
  canAddToFav: false,
};

const mapStateToProps = ({ root: { favorites } }) => ({
  favorites,
});

export default connect(mapStateToProps)(SearchResultItem);
