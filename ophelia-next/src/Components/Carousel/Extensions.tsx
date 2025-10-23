/* eslint-disable @next/next/no-img-element */
import { ReactElement } from "react";

type SlideProps = {
    component?: ReactElement; // Değişiklik: JSX.Element yerine ReactElement kullanıldı
};

const generateBigSlideComponent = ({
    component
}: SlideProps): ReactElement => {
    if (!component) {
        return <div>No component available</div>; // Varsayılan bileşen
    }
    
    return component;
};

export { generateBigSlideComponent };
