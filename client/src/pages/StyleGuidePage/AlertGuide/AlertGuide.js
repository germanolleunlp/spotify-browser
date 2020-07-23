import React from "react";

import Box from "@material-ui/core/Box";

import useFigmaAlerts from "../../../hooks/useFigmaAlerts";

import CodeEditor from "../CodeEditor";
import Loader from "../../../components/Loader";
import Typography from "../../../components/Typography";
import Alert from "../../../components/Alert";

const AlertGuide = () => {
  const figmaAlerts = useFigmaAlerts();

  if (!figmaAlerts) {
    return <Loader />;
  }

  return (
    <Box>
      <Typography figma={"figma-typography-display-4"}>Alerts</Typography>
      <Box style={{ width: "100%" }}>
        {figmaAlerts.map(({ name }) => {
          return (
            <Box key={name}>
              <Typography figma={"figma-typography-lead"}>
                figma-{name}
              </Typography>
              <Box
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginBottom: "10px",
                  padding: "10px 0",
                }}
              >
                <Alert figma={`figma-${name}`}>
                  <strong>Well done!</strong> You successfully read{" "}
                  <strong>this important alert message</strong>.
                </Alert>
                <Typography style={{ margin: "5px 0" }}>
                  Class:
                  <span
                    style={{
                      marginLeft: "5px",
                      color: "#db7093",
                    }}
                  >
                    {`"figma-${name}"`}
                  </span>
                </Typography>
                <Box
                  style={{
                    margin: "10px 0",
                    background: "#eee8d5",
                    borderRadius: "4px",
                  }}
                >
                  <CodeEditor
                    code={`
  import React from "react";
  import Alert from "components/Alert";

  <Alert figma="figma-${name}">
    <strong>Well done!</strong> You successfully read <strong>this important alert message</strong>.
  </Alert>
                `}
                  />
                </Box>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default AlertGuide;
