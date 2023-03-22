import * as React from "react";
import ChartDataLabels from "chartjs-plugin-datalabels";

import { inject, observer } from "mobx-react";
import { AppComponentListBase } from "@components/AppComponentBase";
import { Row, Col, Card } from "antd";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  registerables as registerablesJS,
} from "chart.js";
import withRouter from "@components/Layout/Router/withRouter";
export interface IBarChartHorizontalProps {
  Title: any;
}

export interface IBarChartHorizontalState {}
ChartJS.register(...registerablesJS, ArcElement, Tooltip, Legend);
const data = {
  labels: ["New", "Renew", "Tertminate", "early terminate"],
  datasets: [
    {
      data: [3, 10, 10, 10],
      backgroundColor: ["#27AE60", "#FEC20C", "#F2994A", "#666699"],
      display: true,
      //   borderColor: "#D1D6DC",
    },
  ],
};
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
class BarChartHorizontal extends AppComponentListBase<
  IBarChartHorizontalProps,
  IBarChartHorizontalState
> {
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
                <Bar
                  height={300}
                  data={data}
                  plugins={[ChartDataLabels]}
                  options={{
                    maintainAspectRatio: false,
                    indexAxis: "y" as const,
                    plugins: globalPlugins(),
                  }}
                />
              </Col>
            </Row>
          </div>
        </Card>
      </>
    );
  }
}

export default withRouter(BarChartHorizontal);
