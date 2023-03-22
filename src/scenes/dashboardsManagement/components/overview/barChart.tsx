import * as React from "react";

import { inject, observer } from "mobx-react";
import { AppComponentListBase } from "@components/AppComponentBase";
import { Row, Col, Card } from "antd";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  registerables as registerablesJS,
} from "chart.js";
import withRouter from "@components/Layout/Router/withRouter";
import BarChartHorizontal from "./barChartHorizontal";
export interface IBarChartProps {
  Title: any;
}

export interface IBarChartState {}
ChartJS.register(...registerablesJS, ArcElement, Tooltip, Legend);

export const globalPlugins: any = (additionPlugin?) => ({
  ...additionPlugin,
  legend: {
    position: "left",
  },
  datalabels: {
    color: "white",
    display: function (context) {
      return (context.dataset.data[context.dataIndex] || 0) > 1;
    },
    font: {
      weight: "bold",
      size: 8,
    },
    formatter: Math.round,
  },
});
@inject()
@observer
class BarChart extends AppComponentListBase<IBarChartProps, IBarChartState> {
  formRef: any = React.createRef();
  state = {};

  changeTab = (tabKey) => {
    this.setState({ tabActiveKey: tabKey });
  };
  public render() {
    return (
      <>
        <Card style={{ borderRadius: "16px" }}>
          <strong>{this.props.Title}</strong>
          <div>
            <Row gutter={[0, 0]}>
              {/* <Col sm={{ span: 12, offset: 0 }}></Col> */}
              <Col sm={{ span: 24, offset: 0 }}>
                <BarChartHorizontal />
              </Col>
            </Row>
          </div>
        </Card>
      </>
    );
  }
}

export default withRouter(BarChart);
