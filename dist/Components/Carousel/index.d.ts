import React from "react";
declare const Carousel: React.FC<CarouselProps>;
export default Carousel;
declare var carouselProps: {
    id?: string;
    visible?: boolean;
    data?: Array<{
        image?: string | React.JSX.Element;
        component?: React.JSX.Element;
        location?: string;
    }>;
    selectedIndex?: number;
    className?: string;
    children?: React.ReactNode;
    arrowPosition?: string;
    iconLeft?: string | React.JSX.Element;
    iconRight?: string | React.JSX.Element;
    slidesToShow?: number;
    autoplay?: boolean;
    autoplayInterval?: number;
    gap?: number;
    loop?: boolean;
    theme?: CarouselTheme;
};
export declare type CarouselProps = typeof carouselProps;
declare var carouselTheme: {
    Class?: string;
    IndicatorClass?: string;
    RightButtonClass?: string;
    LeftButtonClass?: string;
};
export declare type CarouselTheme = typeof carouselTheme;
