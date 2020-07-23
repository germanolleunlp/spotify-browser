import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

import Loader from "../../components/Loader";
import Typography from "../../components/Typography";

import ColorGuide from "./ColorGuide/ColorGuide";
import TypographyGuide from "./TypographyGuide/TypographyGuide";
import ButtonGuide from "./ButtonGuide/ButtonGuide";
import BadgeGuide from "./BadgeGuide/BadgeGuide";
import AlertGuide from "./AlertGuide/AlertGuide";

import { ERROR_URL } from "../../routes";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
    backgroundColor: "white",
  },
  menu: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    flexBasis: "15%",
    padding: "2% 0",
    borderRight: "solid 2px black",
  },
  option: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    flexBasis: "85%",
    padding: "2% 5%",
  },
}));

const StyleGuidePage = ({ error, isLoading }) => {
  const classes = useStyles();

  const initialGuideState = {
    color: false,
    typography: false,
    button: false,
    badge: false,
    alert: false,
  };

  const [showGuide, setShowGuide] = useState({
    ...initialGuideState,
    color: true,
  });

  if (error) {
    return <Redirect to={ERROR_URL} />;
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Box className={classes.root}>
      <Box className={classes.menu} data-testid="style-guide-menu">
        <Button
          onClick={() =>
            setShowGuide({
              ...initialGuideState,
              color: true,
            })
          }
        >
          <Typography figma="figma-typography-lead">Color</Typography>
        </Button>
        <Button
          onClick={() =>
            setShowGuide({
              ...initialGuideState,
              typography: true,
            })
          }
        >
          <Typography figma="figma-typography-lead">Typography</Typography>
        </Button>
        <Button
          onClick={() =>
            setShowGuide({
              ...initialGuideState,
              button: true,
            })
          }
        >
          <Typography figma="figma-typography-lead">Button</Typography>
        </Button>
        <Button
          onClick={() =>
            setShowGuide({
              ...initialGuideState,
              badge: true,
            })
          }
        >
          <Typography figma="figma-typography-lead">Badge</Typography>
        </Button>
        <Button
          onClick={() =>
            setShowGuide({
              ...initialGuideState,
              alert: true,
            })
          }
        >
          <Typography figma="figma-typography-lead">Alert</Typography>
        </Button>
      </Box>
      <Box className={classes.option} data-testid="style-guide">
        {showGuide.color && <ColorGuide />}
        {showGuide.typography && <TypographyGuide />}
        {showGuide.button && <ButtonGuide />}
        {showGuide.badge && <BadgeGuide />}
        {showGuide.alert && <AlertGuide />}
      </Box>
    </Box>
  );
};

const mapStateToProps = ({ root: { error, isLoading } }) => ({
  error,
  isLoading,
});

export default connect(mapStateToProps)(StyleGuidePage);
