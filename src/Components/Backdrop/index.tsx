import { getAppTheme } from "../../AppTheme";
import React, { useEffect } from "react";
import { useMediaQuery } from "../../Hooks";
const Backdrop: React.FC<{
  id?: string;
  visible?: boolean;
  className?: string;
}> = ({ id = undefined, className = undefined, visible = true }) => {
  const theme = getAppTheme();
  const isMd = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    const mobileMenu = document.getElementById("mobileNavbar");
    if (visible) {
      document.body.style.overflow = "hidden";
      if (
        !isMd &&
        mobileMenu &&
        !mobileMenu?.classList?.contains("mobileMenuOpen")
      )
        mobileMenu.style.display = "none";
    } else {
      document.body.style.overflow = "hidden auto";
      if (!isMd && mobileMenu) mobileMenu.style.display = "flex";
    }

    return () => {
      document.body.style.overflow = "hidden auto";
      if (!isMd && mobileMenu) mobileMenu.style.display = "flex";
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  return (
    <>
      {visible && (
        <div id={id} className={className ?? theme.Common?.Backdrop}></div>
      )}
    </>
  );
};
export default Backdrop;
