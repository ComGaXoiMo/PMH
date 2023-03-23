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
const lb = ["unit01", "unit02", "unit03", "unit04"];
const dt = [
  {
    name: "unit01",
    Leased: 1,
    Vacant: 10,
    Showroom: 0,
    Renovation: 2,
  },
  {
    name: "unit02",
    Leased: 1,
    Vacant: 0,
    Showroom: 2,
    Renovation: 2,
  },
  {
    name: "unit03",
    Leased: 3,
    Vacant: 2,
    Showroom: 0,
    Renovation: 2,
  },
  {
    name: "unit04",
    Leased: 1,
    Vacant: 1,
    Showroom: 0,
    Renovation: 1,
  },
];
export interface IBarChartHorizontalState {}
ChartJS.register(...registerablesJS, ArcElement, Tooltip, Legend);
const data = {
  labels: lb,
  datasets: [
    {
      label: "Leased",
      backgroundColor: "#FFF5D6",
      data: lb.map((label) => {
        const res = dt.find((data) => data.name === label);
        console.log(label);
        return res?.Leased ?? 0;
      }),
      stack: "Stack 0",
    },
    {
      label: "Vacant",
      backgroundColor: "#FEC20C",
      data: lb.map((label) => {
        const res = dt.find((data) => data.name === label);
        return res?.Vacant ?? 0;
      }),
      stack: "Stack 0",
    },
    {
      label: "Showroom",
      backgroundColor: "#760505",
      data: lb.map((label) => {
        const res = dt.find((data) => data.name === label);
        return res?.Showroom ?? 0;
      }),
      stack: "Stack 0",
    },
    {
      label: "Renovation",
      backgroundColor: "#440303",
      data: lb.map((label) => {
        const res = dt.find((data) => data.name === label);
        return res?.Renovation ?? 0;
      }),
      stack: "Stack 0",
    },
  ],
};
export const globalPlugins: any = (additionPlugin?) => ({
  ...additionPlugin,

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
