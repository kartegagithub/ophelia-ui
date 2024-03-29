/// <reference types="react" />
import MenuClass from "../Menu/MenuClass";
export default class SidebarMenuClass extends MenuClass {
    Name?: string;
    EnableSearch?: boolean;
    SearchIcon?: string | React.JSX.Element;
    SearchIconPosition?: "left" | "right";
}
