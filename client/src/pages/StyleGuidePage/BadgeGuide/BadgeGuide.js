import React from "react";
import _ from "lodash";

import Box from "@material-ui/core/Box";

import useFigmaBadges from "../../../hooks/useFigmaBadges";

import CodeEditor from "../CodeEditor";
import Badge from "../../../components/Badge";
import Loader from "../../../components/Loader";
import Typography from "../../../components/Typography";

const BadgeGuide = () => {
  const figmaBadges = useFigmaBadges();

  if (!figmaBadges) {
    return <Loader />;
  }

  const badges = _.groupBy(figmaBadges, (badge) => badge.group);

  return (
    <Box>
      <Typography figma={"figma-typography-display-4"}>Badges</Typography>
      {Object.keys(badges).map((group) => {
        return (
          <Box key={group} style={{ width: "100%" }}>
            <Typography figma={"figma-typography-lead"}>{group}</Typography>
            {badges[group].map((badge) => {
              return (
                <Box
                  key={badge.name}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginBottom: "10px",
                    padding: "10px 0",
                  }}
                >
                  <Box style={{ alignSelf: "center" }}>
                    <Badge
                      color="secondary"
                      badgeContent="New"
                      figma={`figma-badge-${badge.name}`}
                    />
                  </Box>
                  <Typography style={{ margin: "5px 0" }}>
                    Class:
                    <span
                      style={{
                        marginLeft: "5px",
                        color: "#db7093",
                      }}
                    >
                      {`"figma-badge-${badge.name}"`}
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
  import Badge from "components/Badge";

  <Badge color="secondary" badgeContent="New" figma="figma-badge-${
    badge.name
  }" />
                    `}
                    />
                  </Box>
                </Box>
              );
            })}
          </Box>
        );
      })}
    </Box>
  );
};

export default BadgeGuide;
