import { getAppTheme } from "../../AppTheme";
import React, { useState } from "react";
const Progress: React.FC<{ text?: string, visible?: boolean, className?: string, barClassName?: string, width?: string, showWidthAsText?: boolean }> = ({ text = "", className = undefined, width = "", visible = true, barClassName = undefined, showWidthAsText = true}) => {  
  if(!visible) return <></>
  
  const theme = getAppTheme();
  return (
    <div className={className ?? theme.Progress?.Class}>
      <div className={barClassName ?? theme.Progress?.BarClass} style={{width: width }}>{showWidthAsText ? width: text}</div>
    </div>
  );
}
export default Progress;

var progressTheme: {
  Class?: string,
  BarClass?: string,
}
export type ProgressTheme = typeof progressTheme