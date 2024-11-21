import React from "react";

const Progress: React.FC<{
  id?: string;
  text?: string;
  visible?: boolean;
  width?: string;
  showWidthAsText?: boolean;
}> = ({
  id,
  text = "",
  width = "",
  visible = true,
  showWidthAsText = true,
}) => {
  if (!visible) return <></>;
  return (
    <div className="oph-progress" id={id}>
      <div className="oph-progress-bar" style={{ width: width }}>
        {showWidthAsText ? width : text}
      </div>
    </div>
  );
};
export default Progress;
