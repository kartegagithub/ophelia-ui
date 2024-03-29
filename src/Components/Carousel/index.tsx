import React, { useEffect, useRef, useState} from "react";
import { getImageComponent } from "../Image/Extensions";
import Indicator from "../Indicator";
import { getAppTheme } from "../../AppTheme";

const Carousel: React.FC<CarouselProps> = React.memo(({ 
  id, 
  data, 
  visible, 
  iconLeft, 
  iconRight, 
  selectedIndex,  
  children, 
  arrowPosition,
  slidesToShow = 1, 
  autoplay = false,
  autoplayInterval = 2000,
  gap = 12,
  loop = false,
    theme = undefined
  }) => {
    const [slider, setSlider] = useState(data ?? []);
    const [activeIndex, setActiveIndex] = useState(selectedIndex ?? 0);
    const Theme = getAppTheme({Carousel: theme}).Carousel;
    const timerRef = useRef<NodeJS.Timeout | null>(null); // Null ekledim, ilk başta bir değer atanmadığında hata almayı önler.

    useEffect(() => {
       handleAutoPlay();
    }, [autoplay, autoplayInterval, activeIndex, slider]); // Bağımlılıkları buraya ekledim

    useEffect(() => {
       handleLoop();
    }, [autoplayInterval, autoplay, activeIndex, slider]); // Bağımlılıkları buraya ekledim


    const handleAutoPlay = () => {
      // if (autoplay) {
      //   if (timerRef.current) clearInterval(timerRef.current); // Önceki zamanlayıcıyı temizle
      //   timerRef.current = setInterval(nextSlide, autoplayInterval);
      //   return () => clearInterval(timerRef.current); 
      // }

      if (autoplay) {
        if (timerRef.current !== null) clearInterval(timerRef.current); // null kontrolü ekledim
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
      return undefined
    };
  
    if (!iconLeft) {
      iconLeft = <svg className="w-4 h-4 dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
      </svg>;
    }
    if (!iconRight) {
      iconRight = <svg className="w-4 h-4 dark:text-gray-800 rtl:rotate-90" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
      </svg>;
    }
  
    const prevSlide = () => {
      const index = (activeIndex - slidesToShow + slider.length) % slider.length;
      setActiveIndex(index);
    };
  
    const nextSlide = () => {
      const index = (activeIndex + slidesToShow) % slider.length;
      setActiveIndex(index);
    };
  
    if (!visible) return <></>;
    return (
      <div className={Theme?.Class}>
        <div className="relative overflow-hidden rounded-lg">
          <div className={`flex animate-fade gap-${gap}`} style={{ gap: gap + "px" }}>
            {slider.map((item, index) => (
              <div
                key={index}
                className={`duration-700 ease-in-out  ${index >= activeIndex && index < activeIndex + slidesToShow ? '' : 'hidden'}`}
                style={{ flexBasis: `${100 / slidesToShow}%` }}
              >
                {getImageComponent(item.image, { className: "h-full w-full" })}
                {item.component}
              </div>
            ))}
          </div>
        </div>
        <button type="button" onClick={nextSlide} className={`${Theme?.LeftButtonClass} ${arrowPosition}`}>
          {getImageComponent(iconLeft)}
        </button>
        <button type="button" onClick={prevSlide} className={`${Theme?.RightButtonClass} ${arrowPosition}`}>
          {getImageComponent(iconRight)}
        </button>
        <Indicator  
          rootClassName={Theme?.IndicatorClass} 
          activeIndex={activeIndex / slidesToShow} 
          count={Math.ceil(slider.length / slidesToShow )} 
          onChange={(i) => setActiveIndex(i * slidesToShow)} 
        />
      </div>
    );
  });
export default Carousel;

var carouselProps : {
  id?: string;
  visible?: boolean
  data?: Array<{image?: string | React.JSX.Element, component?: React.JSX.Element, location?: string}>;
  selectedIndex?: number;
  className?: string;
  children?: React.ReactNode;
  arrowPosition?: string;
  iconLeft?: string | React.JSX.Element
  iconRight?: string | React.JSX.Element
  slidesToShow?: number;
  autoplay?: boolean;
  autoplayInterval?: number;
  gap?: number;
  loop?: boolean;
  theme?: CarouselTheme
}
export type CarouselProps = typeof carouselProps

var carouselTheme: {
  Class?: string,
  IndicatorClass?: string,
  RightButtonClass?: string,
  LeftButtonClass?: string,
}
export type CarouselTheme = typeof carouselTheme