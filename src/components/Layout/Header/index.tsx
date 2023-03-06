import "./index.less";

import * as React from "react";

import {
  // Button, Col, Row,
  Menu,
} from "antd";
// import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons";
// import { inject, observer } from "mobx-react";
// import Stores from "../../../stores/storeIdentifier";
import SessionStore from "../../../stores/sessionStore";
import { isGranted } from "@lib/abpUtility";
// import { sidebarStatus } from "@lib/appconst";
import { appMenuGroups } from "../Router/router.config";
import GetMenuItems from "./MenuItem";
// import { portalLayouts } from "../Router/router.config";

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
      {/* <div
          className={"wrap-header-logo"}
          style={{ width: this.props.collapsed ? 0 : 256 }}
        >
          {!this.props.collapsed && (
            <>
              <div className={"wrap-logo"}>
                <Avatar
                  shape="square"
                  style={{ height: "auto", width: 120 }}
                  src="/assets/images/logo.png"
                />
              </div>
            </>
          )}
        </div> */}
      <div className={"wrap-header"}>
        {/* {props.sideBarState === sidebarStatus.account && (
          <Row>
            <Col
              style={{ textAlign: "left", padding: "0 24px" }}
              span={18}
            ></Col>
            <Col style={{ textAlign: "right" }} span={6}>
              <div className="wrap-profile">
                <Button
                  danger
                  className="rounded mr-1"
                  onClick={async () => await props.sessionStore?.logout()}
                >
                  {L("LOGOUT")}
                </Button>
                <div style={{ width: 70 }} />
              </div>
            </Col>
          </Row>
        )} */}
        <Menu
          mode="horizontal"
          // defaultSelectedKeys={["2"]}
          items={menuItems}
        />
      </div>
    </div>
  );
};

export default Header;
