import "./index.less";

import * as React from "react";

import { Menu } from "antd";

import SessionStore from "../../../stores/sessionStore";
import { isGranted } from "@lib/abpUtility";
import { appMenuGroups } from "../Router/router.config";
import GetMenuItems from "./MenuItem";

export interface IHeaderProps {
  history?: any;
  sideBarState: any;
  sessionStore?: SessionStore;
  collapsed?: any;
  onCollapse: any;
}
export interface IMenuItemProps {
  name: string;
  path?: any;
  icon?: any;
  isGroup?: boolean;
  children?: any;
  history: any;
  permission?: string;
}

const Header = (props: IHeaderProps) => {
  const menuItems = appMenuGroups
    .filter((route: any) => {
      const hasGrantedChild = (route.children || []).findIndex((item) =>
        isGranted(item.permission)
      );
      return (
        isGranted(route.permission) ||
        (route.children && route.children.length && hasGrantedChild !== -1)
      );
    })
    .map((route: any) => {
      return GetMenuItems(route);
    });
  // .filter((item) => !item.children.includes(null));
  React.useEffect(() => {
    // console.log(menuItems);
  });

  return (
    <div className={"header-container"}>
      <div className={"wrap-header"}>
        <Menu className="ant-menu-bar" mode="horizontal" items={menuItems} />
      </div>
    </div>
  );
};

export default Header;
