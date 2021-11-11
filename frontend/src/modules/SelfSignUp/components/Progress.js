import { colors } from "$lib/theme";
import { styled } from "@mui/material/styles";
import React from "react";

const StyledProgress = styled("div")({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
});

const StyledDot = styled("div")((props) => ({
  backgroundColor: props["data-active"] ? colors.blue[300] : colors.gray[100],
  width: "16px",
  height: "16px",
  borderRadius: "999px",
  margin: "0 1rem",
}));

/**
 * @typedef {Object} Props
 * @property {number} step
 */
/**
 * @param  {Props} props
 * @returns
 */
const Progress = (props) => {
  return (
    <StyledProgress>
      {[1, 2, 3].map((i) => (
        <StyledDot key={i} data-active={i <= props.step} />
      ))}
    </StyledProgress>
  );
};

export default Progress;
