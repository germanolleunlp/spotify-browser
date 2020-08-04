import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import clsx from "clsx";

import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

import Typography from "./Typography";
import SearchResultImage from "./SearchResultImage";
import LikeButton from "./LikeButton";
import DislikeButton from "./DislikeButton";

const useStyles = makeStyles((theme) => ({
  item: {
    display: "flex",
    flexFlow: "column nowrap",
    width: 200,
    margin: theme.spacing(1),
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
    color: theme.palette.common.white,
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
  likeable,
  favorites,
  duration_ms,
  ...attrs
}) => {
  const classes = useStyles();
  const liked = favorites[id];

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
            variant="subtitle1"
            className={clsx(classes.default)}
            noWrap
            data-testid="search-result-item-title"
          >
            {title}
          </Typography>
          <Typography
            variant="subtitle2"
            className={clsx(classes.default)}
            noWrap
            data-testid="search-result-item-subtitle"
          >
            {subtitle}
          </Typography>
        </Box>
      </a>
      {likeable &&
        (!!liked ? (
          <DislikeButton track={{ id, title }} />
        ) : (
          <LikeButton
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
  id: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  image: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }),
  name: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  duration_ms: PropTypes.number,
  likeable: PropTypes.bool,
};

SearchResultItem.defaultProps = {
  image: null,
  likeable: false,
};

const mapStateToProps = ({ root: { favorites } }) => ({
  favorites,
});

export default connect(mapStateToProps)(SearchResultItem);
