import React from "react";
import tinycolor from "tinycolor2";

import Box from "@material-ui/core/Box";

import useFigmaColors from "../../../hooks/useFigmaColors";

import CodeEditor from "../CodeEditor";
import Loader from "../../../components/Loader";
import Typography from "../../../components/Typography";

const ColorGuide = () => {
  const figmaColors = useFigmaColors();

  if (!figmaColors) {
    return <Loader />;
  }

  return (
    <Box>
      <Typography figma={"figma-typography-display-4"}>Colors</Typography>
      <Box style={{ width: "100%" }}>
        {figmaColors.map(({ name, color: value }) => {
          return (
            <Box key={name}>
              <Typography
                figma={"figma-typography-lead"}
                style={{ color: value }}
              >
                figma-color-{name}
              </Typography>
              <Box
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginBottom: "10px",
                  padding: "10px 0",
                }}
              >
                <Box
                  style={{
                    width: "150px",
                    height: "150px",
                    borderRadius: "50%",
                    border: "1px solid lightgray",
                    alignSelf: "center",
                    background: value,
                  }}
                />
                <Typography style={{ margin: "10px 0", alignSelf: "center" }}>
                  {tinycolor(value).toHexString()}
                </Typography>
                <Typography style={{ margin: "5px 0" }}>
                  Class:
                  <span
                    style={{
                      marginLeft: "5px",
                      color: "#db7093",
                    }}
                  >
                    {`"figma-color-${name}"`}
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
  import Box from "@material-ui/core/Box";

  <Box figma="figma-color-${name}" />
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

export default ColorGuide;
