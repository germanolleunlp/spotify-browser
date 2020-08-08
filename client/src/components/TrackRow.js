import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Link from "@material-ui/core/Link";

import FavButton from "./FavButton";

import { ReactComponent as AlbumIcon } from "../assets/album.svg";

import Typography from "./Typography";

const useStyles = makeStyles((theme) => ({
  item: {
    padding: 0,
    marginBottom: "5px",
    textDecoration: "none",
  },
  avatar: {
    width: 50,
    height: 50,
    marginRight: theme.spacing(2),
    backgroundColor: "transparent",
    borderRadius: "10%",
  },
  icon: {
    width: "1em",
    height: "1em",
  },
  name: {
    margin: 0,
  },
  album: {
    display: "block",
  },
  textRight: {
    textAlign: "right",
  },
  duration: {
    letterSpacing: "0.05em",
    fontWeight: 300,
    marginRight: theme.spacing(2),
  },
  default: {
    color: `${theme.palette["bg-default"].main}`,
  },
}));

const TrackLink = ({ href, text, ...props }) => (
  <Link href={href} rel="noopener noreferrer" target="_blank">
    <Typography {...props}>{text}</Typography>
  </Link>
);

const TrackRow = ({ id, href, name, album, duration, canAddToFav }) => {
  const classes = useStyles();
  const image = album.images.slice(-1)[0];

  return (
    <ListItem className={classes.item} data-testid="track-row">
      <ListItemAvatar>
        <Avatar
          className={classes.avatar}
          alt={album.name}
          src={(image && image.url) || ""}
          data-testid="track-avatar"
        >
          <AlbumIcon className={classes.icon} data-testid="album-icon" />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={
          <TrackLink
            href={href}
            text={name}
            figma="figma-typography-text-1"
            className={clsx(classes.name, classes.default)}
            data-testid="track-album-name"
          />
        }
        secondary={
          <TrackLink
            href={href}
            text={album.name}
            figma="figma-typography-text-2"
            className={clsx(classes.album, classes.default)}
            data-testid="track-album-name"
          />
        }
        data-testid="track-name"
      />
      <ListItemText
        className={classes.textRight}
        primary={
          <Typography
            figma="figma-typography-text-2"
            className={clsx(classes.duration, classes.default)}
          >
            {duration}
          </Typography>
        }
        data-testid="track-duration"
      />
      {canAddToFav && (
        <FavButton
          track={{
            id,
            name,
            external_urls: { spotify: href },
            album,
            duration,
          }}
        />
      )}
    </ListItem>
  );
};

TrackRow.propTypes = {
  href: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  album: PropTypes.shape({
    name: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string.isRequired,
      })
    ),
  }).isRequired,
  duration: PropTypes.string.isRequired,
  canAddToFav: PropTypes.bool,
};

TrackRow.defaultProps = {
  album: {
    images: [],
  },
  canAddToFav: false,
};

export default TrackRow;
