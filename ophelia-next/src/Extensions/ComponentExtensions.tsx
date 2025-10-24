import { useEffect, useRef } from "react";

export const useScrollInlineDynamically = (pathname: string) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const activeLinkRef = useRef<HTMLAnchorElement | any>(null);

  useEffect(() => {
    if (activeLinkRef.current && scrollContainerRef.current) {
      const activeLink = activeLinkRef.current;
      const scrollContainer = scrollContainerRef.current;
      const activeLinkOffsetLeft = activeLink.offsetLeft;
      const containerWidth = scrollContainer.clientWidth;
      const linkWidth = activeLink.clientWidth;

      const scrollTo =
        activeLinkOffsetLeft - containerWidth / 2 + linkWidth / 2;
      scrollContainer.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  }, [pathname]);

  return { scrollContainerRef, activeLinkRef };
};