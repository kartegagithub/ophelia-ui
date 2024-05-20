import { getAppTheme } from "../../AppTheme";
import { IconProps } from "../Icon";
import RawHTML from "../RawHTML";
import Image from "./Image";

export function getImageComponent(elem: string | React.JSX.Element | Function | IconProps | any | undefined, props?: any, funcParams?: any): React.JSX.Element{
    if(!elem) return <></> 
    if(!props) props = {};
    if(typeof elem == "object" && !elem.props && elem.name){
        var name = elem.name;
        props = {...(({ name, ...others }) => others)(elem), ...props}
        elem = name
    }
    if (typeof elem === "string"){
        if(elem.indexOf("http") == -1 && elem.indexOf("/") == -1 && elem.indexOf("<") == -1){
            var theme = getAppTheme();
            if((theme.Icons as any)[elem]) return (theme.Icons as any)[elem]
            else if(theme.Icons && theme.Icons.getIconSvg){
                var imageComponent = theme.Icons.getIconSvg(elem, props?.size ?? theme.Icons.DefaultSize, props.className, props.color, props.fill, props.ext1, props.ext2, props.ext3);
                if (typeof imageComponent === "string") return <RawHTML clearHtml={false} sanitize={false} html={ imageComponent } />
                return imageComponent;
            }
        }
        else if(elem.indexOf("/") > -1){
            if(props.unoptimized == undefined) props.unoptimized = true;
            return <Image src={elem} alt="icon" {...props}/>;
        }
        else{
            return <RawHTML clearHtml={false} sanitize={false} html={elem} />;
        }
    }
    if (typeof elem === "function") return getImageComponent(elem(funcParams))
    else if(elem) return elem
    return <></>
}