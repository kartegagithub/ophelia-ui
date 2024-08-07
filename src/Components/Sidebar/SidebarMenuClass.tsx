import Icon from "../Icon"
import MenuClass from "../Menu/MenuClass"
import React from "react"

export default class SidebarMenuClass extends MenuClass {
    Name?: string = "Sidebar"
    EnableSearch?: boolean = true
    SearchIcon?: string | React.JSX.Element = <Icon name="search" color="#A6A5E3" fill="none" />
    SearchIconPosition?: "left" | "right" = "left"
}