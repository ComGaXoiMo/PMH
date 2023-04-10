import { L } from "@lib/abpUtility";
import { Button, Drawer, Row } from "antd";
import React, { ReactNode } from "react";
import type { PortalProps } from "@rc-component/portal";
import { CloseCircleFilled, EditOutlined } from "@ant-design/icons";

type Props = {
  title?: string;
  visible: boolean;
  onClose?: () => void;
  onEdit?: () => void;
  onShare?: () => void;
  useBottomAction?: boolean;
  extraBottomContent?: ReactNode;
  loading?: boolean;
  getContainer?: PortalProps["getContainer"];
};

const CustomDrawer = (props: React.PropsWithChildren<Props>) => {
  return (
    <Drawer
      title={
        <span style={{ fontWeight: 800, justifyItems: "start" }}>
          {props.title}
        </span>
      }
      placement="right"
      closable={false}
      onClose={props.onClose}
      open={props.visible}
      width={window.innerWidth < 600 ? "100%" : "55%"}
      extra={
        <>
          <Row>
            {props.onShare && (
              <Button
                className="custom-buttom-drawe"
                onClick={props.onShare}
                size="middle"
              >
                {L("BTN_SHARE")}
              </Button>
            )}
            &ensp;
            {props.onEdit && (
              <Button
                className="custom-buttom-drawe"
                onClick={props.onEdit}
                size="middle"
              >
                <EditOutlined /> {L("BTN_EDIT")}
              </Button>
            )}
            &ensp;
            <Button
              className="custom-buttom-drawe"
              onClick={props.onClose}
              size="middle"
            >
              <CloseCircleFilled />
              {L("BTN_CLOSE")}
            </Button>
          </Row>
        </>
      }
      getContainer={props.getContainer}
    >
      {props.children}

      <style scoped>{`
      .ant-drawer-content {
        position: relative !important;
      }
      .ant-drawer-content {
        background: #f2f4f8;
      }
      .ant-drawer-header {
        background-color: white;
      }
      .ant-drawer-body {
        padding: 0px 0px 0px 0px !important;
        display: table;
      }
      .bottom-action-style {
        position: absolute  !important;
        width: 100%;
        bottom: 4px;
        right: 0;
        height: 60px;
        background-color: #FAF8EE
      }
      .ant-drawer-right > .ant-drawer-content-wrapper {
      //   min-height: calc(100vh - 180px);
      // max-height: calc(100vh - 180px);
      position:fixed;
       top:46px
      }
      `}</style>
    </Drawer>
  );
};

export default CustomDrawer;
