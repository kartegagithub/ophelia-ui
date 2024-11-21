import React from "react";

const Footer: React.FC<{
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
  bgTop?: React.JSX.Element;
  bgBottom?: React.JSX.Element;
  bg?: React.JSX.Element;
}> = React.memo(
  ({
    id,
    visible,
    logo,
    menuItems,
    contactInformation,
    socialMediaLinks,
    languageOptions,
    brandInfo,
    children,
    siteMapUrl,
    bgTop,
    bgBottom,
    bg,
  }) => {
    const getFooter = () => {
      return (
        <div id={id} className="oph-footer-layout">
          <div className="oph-footer-layout-logoInfo">
            {logo}
            {contactInformation}
          </div>
          <div className="oph-footer-layout-menu">
            {menuItems?.map((item, index) => {
              return (
                <div key={index}>
                  <label>{item?.name}</label>
                  <div className="oph-footer-layout-menu-item">
                    {item?.item?.map((el, i) => {
                      return (
                        <a key={i} href="">
                          {el?.name}
                        </a>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="oph-footer-layout-links">
            {languageOptions}
            <div className="oph-footer-layout-links-social">
              {socialMediaLinks?.map((item, index) => {
                return item.component;
              })}
            </div>
          </div>
        </div>
      );
    };
    if (!visible) return <></>;
    return (
      <footer id={id} className={`oph-footer`}>
        {bg} {bgTop} {bgBottom}
        {children ? children : getFooter()}
        {brandInfo && brandInfo}
        {siteMapUrl && siteMapUrl}
      </footer>
    );
  }
);
Footer.displayName = "Footer";
export default Footer;
