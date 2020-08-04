import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import clsx from "clsx";

import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Link from "@material-ui/core/Link";

import { ReactComponent as AlbumIcon } from "../assets/album.svg";
import Typography from "./Typography";
import LikeButton from "./LikeButton";
import DislikeButton from "./DislikeButton";

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
    color: theme.palette.common.white,
  },
}));

const TrackLink = ({ href, text, ...props }) => (
  <Link href={href} rel="noopener noreferrer" target="_blank">
    <Typography {...props}>{text}</Typography>
  </Link>
);

const TrackRow = ({ id, href, name, album, duration, favorites }) => {
  const classes = useStyles();
  const image = album.images.slice(-1)[0];
  const liked = favorites[id];

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
            variant="subtitle1"
            className={clsx(classes.name, classes.default)}
            data-testid="track-album-name"
          />
        }
        secondary={
          <TrackLink
            href={href}
            text={album.name}
            variant="subtitle2"
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
            variant="subtitle2"
            className={clsx(classes.duration, classes.default)}
          >
            {duration}
          </Typography>
        }
        data-testid="track-duration"
      />
      {!!liked ? (
        <DislikeButton track={{ id, title: name }} />
      ) : (
        <LikeButton
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
  id: PropTypes.string.isRequired,
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
};

TrackRow.defaultProps = {
  album: {
    images: [],
  },
};

const mapStateToProps = ({ root: { favorites } }) => ({
  favorites,
});

export default connect(mapStateToProps)(TrackRow);
