import { L } from "@lib/abpUtility";
import { Button, Drawer, Row } from "antd";
import React, { ReactNode } from "react";
import type { PortalProps } from "@rc-component/portal";
import { CloseCircleFilled } from "@ant-design/icons";

type Props = {
  title?: string;
  visible: boolean;
  onClose?: () => void;
  onFullView?: () => void;
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
      width={window.innerWidth < 600 ? "100%" : "50%"}
      extra={
        <>
          <Row>
            {props.onShare && (
              <Button
                className="custom-buttom-drawe"
                onClick={props.onShare}
                size="small"
                shape="round"
              >
                {L("BTN_SHARE")}
              </Button>
            )}
            {props.onFullView && (
              <Button
                className="custom-buttom-drawe"
                onClick={props.onFullView}
                size="small"
                shape="round"
              >
                {L("BTN_FULL_VIEW")}
              </Button>
            )}
            <Button
              className="custom-buttom-drawe"
              onClick={props.onClose}
              size="small"
              shape="round"
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
      .ant-drawer-body {
        padding: 4px 0px 0px 0px !important;
      }
      .bottom-action-style {
        position: absolute  !important;
        width: 100%;
        bottom: 4px;
        right: 0;
        height: 60px;
        background-color: #FAF8EE
      }
      `}</style>
    </Drawer>
  );
};

export default CustomDrawer;
