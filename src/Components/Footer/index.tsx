import React from "react";
import { getAppTheme } from "../../AppTheme";

const Footer: React.FC<{
  id?: string;
  visible?: boolean
  logo?: React.JSX.Element;
  menuItems?: Array<{id?: number | React.JSX.Element, name?: string, item?: Array<{id?: number | React.JSX.Element, name?: string, url: string}>}>;
  contactInformation ?: React.JSX.Element;
  socialMediaLinks ? : Array<{id?: number, component?: React.JSX.Element, location?: string}>;
  languageOptions?:  React.JSX.Element;
  brandInfo ?:  React.JSX.Element;
  children?: React.ReactNode;
  siteMapUrl ?: string;
  className?: string;
  layoutClassName? : string;
  menuContainerClass? : string;
  socialLinksClass? : string;
  bgColor? : string;
  bgTop? : React.JSX.Element;
  bgBottom? : React.JSX.Element;
  bg? : React.JSX.Element;
  sticky?: string

}> = React.memo(({ 
  id, 
  visible, 
  logo, 
  menuItems, 
  contactInformation , 
  socialMediaLinks , 
  languageOptions, 
  brandInfo ,
  children, 
  siteMapUrl ,
  className = "container p-20 text-black",
  layoutClassName = "container grid grid-cols-3 gap-4 grid-flow-row grid-",
  menuContainerClass = "flex flex-row gap-4 justify-between",
  socialLinksClass = "gap-4 flex-col",
  bgColor = "bg-white",
  bgTop,
  bgBottom,
  bg,
  sticky = "relative" }) => {
    const theme = getAppTheme();
  
    const getFooter = () => {
        return(
            <div className={`${layoutClassName}`}>
                <div className="row-start-1 gap-4">
                    {logo}     
                    {contactInformation}
                </div>
                <div className={`${menuContainerClass}`}>
                    {menuItems?.map((item, index) => {
                        return(
                            <div>
                                <label>{item?.name}</label>
                                <div className="grid grid-cols-1">
                                    {item?.item?.map((el,_) => {
                                        return(
                                            <a href="">{el?.name}</a>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className={`${socialLinksClass}`}>
                    {languageOptions}
                    <div className="grid grid-cols-2">
                        {socialMediaLinks?.map((item, index) => {
                            return(
                                item.component
                            )
                        })}
                    </div>

                </div>
            </div>
        )
    }
    if (!visible) return <></>;
    return (
        <footer className={`${bgColor} ${className} ${sticky} border-t-1 shadow-inner`}>
            {bg} {bgTop} {bgBottom}
            {children ? children : getFooter()}
            {brandInfo && brandInfo}
            {siteMapUrl && siteMapUrl}
        </footer>
    );
  });
export default Footer;
