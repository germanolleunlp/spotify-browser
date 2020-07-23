import React from "react";
import _ from "lodash";

import Box from "@material-ui/core/Box";

import useFigmaButtons from "../../../hooks/useFigmaButtons";

import CodeEditor from "../CodeEditor";
import Button from "../../../components/Button";
import Loader from "../../../components/Loader";
import Typography from "../../../components/Typography";

const ButtonGuide = () => {
  const figmaButtons = useFigmaButtons();

  if (!figmaButtons) {
    return <Loader />;
  }

  const buttons = _.groupBy(figmaButtons, (button) => button.group);

  // remove state buttons
  delete buttons["button-hover-active"];
  delete buttons["button-display-disabled"];

  return (
    <Box>
      <Typography figma={"figma-typography-display-4"}>Buttons</Typography>
      {Object.keys(buttons).map((group) => {
        return (
          <Box key={group}>
            <Typography figma={"figma-typography-lead"}>{group}</Typography>
            <Box
              style={{
                display: "flex",
                flexWrap: "wrap",
              }}
            >
              {buttons[group].map((button) => {
                return (
                  <Box
                    key={button.name}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginBottom: "10px",
                      marginRight: "15px",
                      padding: "10px 0",
                      width: "fit-content",
                    }}
                  >
                    <Box
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        marginBottom: "10px",
                      }}
                    >
                      <Button
                        figma={`figma-${button.name}`}
                        style={{ width: "fit-content", margin: "0 10px" }}
                      >
                        Button
                      </Button>
                      <Button
                        figma={`figma-${button.name}`}
                        style={{ width: "fit-content", margin: "0 10px" }}
                        disabled
                      >
                        Disabled
                      </Button>
                    </Box>
                    <Typography style={{ margin: "5px 0" }}>
                      Class:
                      <span
                        style={{
                          marginLeft: "5px",
                          color: "#db7093",
                        }}
                      >
                        {`"figma-${button.name}"`}
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
  import Button from "components/Button";  

  <Button figma="figma-${button.name}">Button</Button>  
                    `}
                      />
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default ButtonGuide;
