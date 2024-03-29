import { getAppTheme } from "../../AppTheme";
import React from "react";
const Backdrop: React.FC<{
  id?: string;
  visible?: boolean;
  className?: string;
}> = ({
  id = undefined,
  className = undefined,
  visible = true,
}) => {
  const theme = getAppTheme();
  return (
    <>
      {visible && <div id={id} className={className ?? theme.Common?.Backdrop}></div>}
    </>
  );
};
export default Backdrop;
