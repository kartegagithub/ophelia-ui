import React from "react";
declare const Footer: React.FC<{
    id?: string;
    visible?: boolean;
    logo?: React.JSX.Element;
    menuItems?: Array<{
        id?: number | React.JSX.Element;
        name?: string;
        item?: Array<{
            id?: number | React.JSX.Element;
            name?: string;
            url: string;
        }>;
    }>;
    contactInformation?: React.JSX.Element;
    socialMediaLinks?: Array<{
        id?: number;
        component?: React.JSX.Element;
        location?: string;
    }>;
    languageOptions?: React.JSX.Element;
    brandInfo?: React.JSX.Element;
    children?: React.ReactNode;
    siteMapUrl?: string;
    className?: string;
    layoutClassName?: string;
    menuContainerClass?: string;
    socialLinksClass?: string;
    bgColor?: string;
    bgTop?: React.JSX.Element;
    bgBottom?: React.JSX.Element;
    bg?: React.JSX.Element;
    sticky?: string;
}>;
export default Footer;
