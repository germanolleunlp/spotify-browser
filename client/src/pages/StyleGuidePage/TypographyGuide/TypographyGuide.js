import React from "react";

import Box from "@material-ui/core/Box";

import useFigmaTypographies from "../../../hooks/useFigmaTypographies";

import CodeEditor from "../CodeEditor";
import Loader from "../../../components/Loader";
import Typography from "../../../components/Typography";

const TypographyGuide = () => {
  const figmaTypographies = useFigmaTypographies();

  if (!figmaTypographies) {
    return <Loader />;
  }

  return (
    <Box>
      <Typography figma={"figma-typography-display-4"}>Typographies</Typography>
      <Box style={{ width: "100%" }}>
        {figmaTypographies.map(({ name }) => {
          return (
            <Box
              key={name}
              style={{
                display: "flex",
                flexDirection: "column",
                marginBottom: "10px",
                padding: "10px 0",
              }}
            >
              <Typography
                figma={`figma-typography-${name}`}
                style={{
                  padding: 15,
                  alignSelf: "center",
                }}
              >
                figma-typography-{name}
              </Typography>
              <Typography style={{ margin: "5px 0" }}>
                Class:
                <span
                  style={{
                    marginLeft: "5px",
                    color: "#db7093",
                  }}
                >
                  {`"figma-typography-${name}"`}
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
  import Typography from "components/Typography";

  <Typography figma="figma-typography-${name}">
    figma-typography-${name}
  </Typography>
                `}
                />
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default TypographyGuide;
