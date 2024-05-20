import React, { useEffect, useRef, useState } from "react";
import { getImageComponent } from "../Image/Extensions";
import Indicator from "../Indicator";
import Icon from "../Icon";
import { CarouselTheme } from "./CarouselTheme";
import { AppTheme, getAppTheme } from "../../AppTheme";

const Carousel: React.FC<CarouselProps> = React.memo(
  ({
    id,
    data,
    visible,
    selectedIndex,
    children,
    options,
    arrow,
    responsive = [],
  }) => {
    const [slider, setSlider] = useState<Array<any>>(data || []);
    const [activeIndex, setActiveIndex] = useState<number>(selectedIndex ?? 0);
    const [firstShow, setFirstShow] = useState<boolean>(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const theme = getAppTheme() as AppTheme;
    const [slideShow, setSlideShow] = useState<number>(3);
    const [outerWidth, setOuterWidth] = useState<string>();

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
      iconSize = 50,
      arrowShow = false,
      arrowPosition = "right",
      indicatorPosition = "",
      indicatorShow = false,
      classNameArrow = "",
      containerClass = ""
    } = arrow ?? {};

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleAutoPlay = () => {
      if (autoplay) {
        if (timerRef.current !== null) clearInterval(timerRef.current);
        timerRef.current = setInterval(nextSlide, autoplayInterval);
      }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          arrowPosition === "right" && "border-azBlack bg-white z-50 hover:border-black"
        }`}
      />
    );

    const iconRight = (
      <Icon
        name={iconLeftName ?? ""}
        color={iconColor}
        size={iconSize}
        className={`${iconClassName} ${
          arrowPosition === "right" && "border-azBlack bg-white z-50 hover:border-black"
        }`}
      />
    );
 

    const getButtonClassName = (direction: string, classNameArrow: string) => {
   
      if(arrowPosition === "normal" ) {
        let buttonClassName =  classNameArrow;
        return buttonClassName;

      }else{
        const classNames = direction === "right"
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
                ? theme.Carousel?.ArrowRightNext
                : theme.Carousel?.ArrowRightPrev);
          }
        return buttonClassName;
      }
     
    };

    useEffect(() => {
      const changeSize = window.innerWidth < 768 ? "100%" : `${window.innerWidth}px`
      setOuterWidth(changeSize);
      const handleResize = () => {
        const windowWidth = window.innerWidth;

        // Genişlik aralıklarını kontrol ederek slayt gösterisini güncelle
        for (let i = responsive.length - 1; i >= 0; i--) {
          const breakpoint = responsive[i].breakpoint;
          const settings = responsive[i].settings;

          // Eğer pencere genişliği, mevcut breakpoint'ten büyükse ve slidesToShow tanımlıysa
          if (windowWidth >= breakpoint && settings.slidesToShow) {
            setSlideShow(settings.slidesToShow);
            break; // İlk uygun breakpoint'i bulduktan sonra döngüyü durdur
          }
        }
      };

      // Sayfa ilk yüklendiğinde boyutu ayarla
      handleResize();

      // Resize olayına abone ol
      window.addEventListener("resize", handleResize);

      // Temizleme fonksiyonunu geri döndür
      return () => window.removeEventListener("resize", handleResize);
    }, [responsive]); // responsive bağımlılığı ile güncelle
    

    if (visible) return null;

    return (
      <div className={`${theme.Carousel?.Class} ${containerClass}`} style={{ width : `${overflow ? outerWidth : "100%"}`}}>
        <div className={`${theme.Carousel?.ClassAnimated} ${gap} overflow-hidden`}>
          {slider.map((item, index) => {
           // Eğer item görüntüleniyorsa isVisible true, değilse false olacak
            const isVisible = index >= activeIndex && index < activeIndex + slideShow;
            const itemWidthPercentage = 100 / slideShow; 

            return (
             <div
              key={index}
              className={`
                ${theme.Carousel?.ItemClass}
                ${isVisible ? "" : "hidden"}
              `}
              style={{
                flexBasis: `${itemWidthPercentage }%`,
                width: `${itemWidthPercentage - 20}%`,

              }}
            >
              {getImageComponent(item.image, {
                className: theme.Carousel?.ItemImageClass, 
              })}
              {item.component}
            </div>
            );
          })}
        </div>
        {arrowShow && (
          <button type="button" onClick={nextSlide} className={getButtonClassName("right", classNameArrow)}>
            {getImageComponent(iconLeft)}
          </button>
        )}
        {arrowShow && (
          <button type="button" onClick={prevSlide} className={getButtonClassName("left", classNameArrow)}>
            {firstShow ? getImageComponent(iconRight) : null}
          </button>
        )}
        {indicatorShow && (
          <Indicator
            rootClassName={`${theme.Carousel?.IndicatorPositionDefault} ${indicatorPosition} ${theme.Carousel?.IndicatorClass}`}
            activeIndex={activeIndex / slideShow}
            count={Math.ceil(slider.length / slideShow)}
            onChange={(i) => setActiveIndex(i * slideShow)}
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
  data?: Array<{ image?: string | React.JSX.Element; component?: React.JSX.Element; location?: string }>;
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
    containerClass?: string;
  };
};
