import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import clsx from "clsx";

import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

import { getArtist } from "../redux/actions";

import Loader from "../components/Loader";
import ArtistTopTracks from "../components/ArtistTopTracks";
import Albums from "../components/Albums";
import Button from "../components/Button";
import Typography from "../components/Typography";

import { ERROR_URL, SEARCH_URL } from "../routes";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.grey.main,
    flexGrow: 1,
  },
  header: {
    display: "flex",
    flexFlow: "row nowrap",
    minHeight: "405px",
    justifyContent: "space-between",
    alignItems: "flex-end",
    padding: "1%",
    borderRadius: theme.shape.borderRadius,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  },
  content: {
    padding: `0 ${theme.spacing(4)}px`,
  },
  section: {
    margin: `${theme.spacing(4)}px 0`,
  },
  button: {
    marginTop: theme.spacing(4),
  },
  default: {
    color: `${theme.palette["bg-default"].main}`,
  },
  buttonText: {
    color: theme.palette["bg-default"].main,
  },
}));

const ArtistPage = ({
  match: {
    params: { artistId },
  },
  error,
  artist,
  isLoading,
  getArtist,
}) => {
  const classes = useStyles();

  useEffect(() => {
    if (artistId) {
      getArtist(artistId);
    }

    window.scrollTo(0, 0);
    // eslint-disable-next-line
  }, [artistId]);

  if (error) {
    return <Redirect to={ERROR_URL} />;
  }

  if (isLoading || !artist) {
    return <Loader />;
  }

  const { images, popularity, topTracks, albums } = artist;

  let headerStyles = {};
  if (images.length) {
    headerStyles = {
      backgroundImage: `url(${images[0].url})`,
    };
  }

  return (
    <Box className={classes.root} data-testid="artist-details">
      <Box className={classes.header} style={headerStyles}>
        <Box>
          <Typography
            figma={"figma-typography-display-1"}
            className={clsx(classes.default)}
          >
            {artist.name}
          </Typography>
          <Typography
            figma={"figma-typography-text-1"}
            className={clsx(classes.default)}
          >
            Popularity: {popularity}/100
          </Typography>
        </Box>
        <Box>
          <Link to={SEARCH_URL}>
            <Button
              className={classes.button}
              figma={"figma-button-display-btn-spotify-primary"}
            >
              <Typography
                figma={"figma-typography-text-1"}
                className={clsx(classes.buttonText)}
              >
                Back
              </Typography>
            </Button>
          </Link>
        </Box>
      </Box>
      <Box className={classes.content}>
        <Box className={classes.section}>
          <Typography
            figma={"figma-typography-display-2"}
            className={clsx(classes.default)}
          >
            Top Tracks
          </Typography>
          <ArtistTopTracks tracks={topTracks} />
        </Box>
        <Box className={classes.section}>
          <Typography
            figma={"figma-typography-display-2"}
            className={clsx(classes.default)}
          >
            Albums
          </Typography>
          <Albums albums={albums} />
        </Box>
      </Box>
    </Box>
  );
};

const mapStateToProps = ({ root: { error, artist, isLoading } }) => ({
  error,
  artist,
  isLoading,
});

const mapDispatchToProps = {
  getArtist,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArtistPage);
