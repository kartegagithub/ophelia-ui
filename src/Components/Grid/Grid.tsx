import React from "react";
import { getAppTheme } from "../../AppTheme";

const Grid: React.FC<{
  children?: React.ReactNode;
  id: string;
}> = React.memo(({ children, id }) => {
  const theme = getAppTheme();
  return (
    <div className="grid-container" id={id}>
      <div className="grid-top-scroll">
        <div className="grid-scrollbar"></div>
      </div>
      <div className="grid-content">{children}</div>
    </div>
  );
});

Grid.displayName = "Grid";
export default Grid;
