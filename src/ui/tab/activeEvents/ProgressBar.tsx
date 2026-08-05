import { useTheme } from "@spooder/webui-component-library";
import React from "react";

interface ProgressBarProps {
  total: number;
  current: number;
  width?: string;
}

export default function ProgressBar(props: ProgressBarProps) {
  const { total, current, width = "200px" } = props;
  const percentage = total > 0 ? Math.min((current / total) * 100, 100) : 0;

  /*console.log(
    "ProgressBar - Total:",
    total,
    "Current:",
    current,
    "Percentage:",
    percentage
  );*/

  return (
    <div style={{ width: "100%", display: "flex", alignItems: "center" }}>
      <svg
        width={width}
        height="20"
        style={{ border: "1px solid #ccc", borderRadius: "4px" }}
      >
        <rect
          x="0"
          y="0"
          width={width}
          height="20"
          fill="var(--color-background-far)"
          rx="4"
          ry="4"
        />
        <rect
          x="0"
          y="0"
          width={`${percentage}%`}
          height="20"
          fill="var(--button-border-color)"
          rx="4"
          ry="4"
        />
      </svg>
    </div>
  );
}
