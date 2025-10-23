import React, { useEffect } from "react";
const Backdrop: React.FC<{
  id?: string;
  visible?: boolean;
}> = ({ id, visible = true }) => {
  useEffect(() => {
    if (visible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "hidden auto";
    }

    return () => {
      document.body.style.overflow = "hidden auto";
    };
  }, [visible]);

  return <>{visible && <div id={id} className="oph-backdrop"></div>}</>;
};
export default Backdrop;
