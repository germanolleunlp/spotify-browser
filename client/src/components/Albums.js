import React from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

import { ReactComponent as AlbumIcon } from "../assets/album.svg";
import SearchResultItem from "./SearchResultItem";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "baseline",
    margin: `${theme.spacing(3)}px 0`,
  },
}));

const Albums = ({ albums }) => {
  const classes = useStyles();

  return (
    <Box className={classes.root} data-testid="albums">
      {albums.map(({ id, name, external_urls, images, artists }) => (
        <SearchResultItem
          data-testid="album"
          key={id}
          href={external_urls.spotify}
          name={name}
          image={images[1]}
          icon={<AlbumIcon />}
          title={name}
          subtitle={artists[0].name}
        />
      ))}
    </Box>
  );
};

Albums.propTypes = {
  albums: PropTypes.array,
};

Albums.defaultProps = {
  albums: [],
};

export default Albums;
