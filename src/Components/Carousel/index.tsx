import React, { useEffect, useRef, useState } from "react";
import Indicator from "../Indicator";
import Icon from "../Icon";
import { CarouselTheme } from "./CarouselTheme";
import { AppTheme, getAppTheme } from "../../AppTheme";

const Carousel: React.FC<CarouselProps> = React.memo(
  ({ id, data, visible, selectedIndex, options, arrow, responsive = [] }) => {
    const [slider, setSlider] = useState<Array<any>>(data || []);
    const [activeIndex, setActiveIndex] = useState<number>(selectedIndex ?? 0);
    const [firstShow, setFirstShow] = useState<boolean>(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const theme = getAppTheme() as AppTheme;
    const [slidesToShow, setSlidesToShow] = useState<number>(3);

    const {
      autoplay = false,
      autoplayInterval = 2000,
      gap = "gap-4",
      loop = false,
      overflow = false,
      fullWidth = "center",
    } = options || {};

    const {
      iconClassName = theme.Carousel?.IconClass,
      iconRightName = "azChevronRight",
      iconLeftName = "azChevronLeft",
      iconColor = "#0D222E",
      iconSize = 40,
      arrowShow = false,
      arrowPosition = "right",
      indicatorShow = false,
      classNameArrow = "",
    } = arrow ?? {};

    const handleAutoPlay = () => {
      if (autoplay) {
        if (timerRef.current !== null) clearInterval(timerRef.current);
        timerRef.current = setInterval(nextSlide, autoplayInterval);
      }
    };

    const handleLoop = () => {
      if (loop && activeIndex === slider.length - 1 && autoplay) {
        const timeout = setTimeout(() => {
          setActiveIndex(0);
        }, autoplayInterval);
        return () => clearTimeout(timeout);
      }
      return undefined;
    };

    useEffect(() => {
      handleAutoPlay();
    }, [autoplay, autoplayInterval, activeIndex, slider, handleAutoPlay]);

    useEffect(() => {
      handleLoop();
    }, [loop, autoplay, autoplayInterval, activeIndex, slider, handleLoop]);

    const prevSlide = () => {
      const index = activeIndex - 1 < 0 ? slider.length - 1 : activeIndex - 1;
      setActiveIndex(index);
    };

    const nextSlide = () => {
      const index = (activeIndex + 1) % slider.length;
      setFirstShow(true);
      setActiveIndex(index);
    };

    const iconLeft = (
      <Icon
        name={iconRightName ?? ""}
        color={iconColor}
        size={iconSize}
        className={`${iconClassName} ${
          arrowPosition === "right" &&
          "border-slate-900 bg-white z-50 hover:border-black"
        }`}
      />
    );

    const iconRight = (
      <Icon
        name={iconLeftName ?? ""}
        color={iconColor}
        size={iconSize}
        className={`${iconClassName} ${
          arrowPosition === "right" &&
          "border-slate-900 bg-white z-50 hover:border-black"
        }`}
      />
    );

    const getButtonClassName = (direction: string, classNameArrow: string) => {
      if (arrowPosition === "normal") {
        let buttonClassName = `${classNameArrow} `;
        return buttonClassName;
      } else {
        const classNames =
          direction === "right"
            ? theme.Carousel?.RightButtonClass
            : theme.Carousel?.LeftButtonClass;
        let buttonClassName = classNames ?? "";
        if (arrowPosition === "top") {
          buttonClassName +=
            " " +
            (direction === "right"
              ? theme.Carousel?.ArrowTopRight
              : theme.Carousel?.ArrowTopLeft);
        } else if (arrowPosition === "right") {
          buttonClassName +=
            " " +
            (direction === "right"
              ? theme.Carousel?.ArrowRightNext
              : theme.Carousel?.ArrowRightPrev);
        } else if (arrowPosition === "left") {
          buttonClassName +=
            " " +
            (direction === "right"
              ? theme.Carousel?.ArrowRightNext
              : theme.Carousel?.ArrowRightNext);
        } else {
          buttonClassName +=
            " " +
            (direction === "right"
              ? "right-0 " + theme.Carousel?.ArrowRightNext
              : "left-0 " + theme.Carousel?.ArrowRightPrev);
        }
        return buttonClassName;
      }
    };

    useEffect(() => {
      const handleResize = () => {
        const windowWidth = window.innerWidth;
        let newSlidesToShow = responsive[0].settings.slidesToShow; // Varsayılan slayt sayısı

        for (let i = 0; i < responsive.length; i++) {
          const breakpoint = responsive[i].breakpoint;
          const settings = responsive[i].settings;

          if (windowWidth >= breakpoint && settings.slidesToShow) {
            newSlidesToShow = settings.slidesToShow;
          }
        }

        setSlidesToShow(newSlidesToShow);
      };

      handleResize();
      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    }, [responsive]);

    if (visible) return null;

    return (
      <div className={`oph-carousel`} id={id}>
        <div className={`oph-carousel-animated ${overflow && "overflow"}`}>
          {slider.map((item, index) => {
            const isVisible =
              index >= activeIndex && index < activeIndex + slidesToShow;
            const itemWidthPercentage = 100 / slidesToShow;

            return (
              <div
                key={index}
                className={`
                  oph-carousel-item 
                  ${isVisible ? "" : "hidden"}
                `}
                style={{
                  flexBasis: `${overflow ? itemWidthPercentage : 100}%`,
                  width: `${overflow ? itemWidthPercentage : 100}%`,
                }}
              >
                <Icon name={item.image} size={10} />
                {item.component}
              </div>
            );
          })}
        </div>
        {arrowShow && (
          <button
            type="button"
            onClick={nextSlide}
            className={getButtonClassName("right", classNameArrow)}
          >
            {iconLeft}
          </button>
        )}
        {arrowShow && !classNameArrow && (
          <button
            type="button"
            onClick={prevSlide}
            className={getButtonClassName("left", classNameArrow)}
          >
            {firstShow ? iconRight : null}
          </button>
        )}
        {indicatorShow && (
          <Indicator
            activeIndex={Math.floor(activeIndex / slidesToShow)}
            count={Math.ceil(slider.length / slidesToShow)}
            onChange={(i) => setActiveIndex(i * slidesToShow)}
          />
        )}
      </div>
    );
  }
);

Carousel.displayName = "Carousel";
export default Carousel;

export type CarouselProps = {
  id?: string;
  visible?: boolean;
  data?: Array<{
    image?: string | React.JSX.Element;
    component?: React.JSX.Element;
    location?: string;
  }>;
  selectedIndex?: number;
  children?: React.ReactNode;
  options?: {
    autoplay?: boolean;
    autoplayInterval?: number;
    gap?: string;
    loop?: boolean;
    theme?: CarouselTheme;
    overflow?: boolean;
    fullWidth?: string;
  };
  responsive?: {
    breakpoint: number;
    settings: {
      slidesToShow: number;
      slidesToScroll?: number;
    };
  }[];
  arrow?: {
    iconRightName?: string;
    iconLeftName?: string;
    iconColor?: string;
    iconActiveColor?: string;
    iconSize?: number;
    iconBorderColor?: string;
    iconBackgroundColor?: string;
    arrowShow?: boolean;
    arrowPosition?: "top" | "right" | "bottom" | "left" | "normal";
    indicatorPosition?: string;
    indicatorShow?: boolean;
    iconClassName?: string;
    classNameArrow?: string;
  };
};
