import * as React from "react";

import { inject, observer } from "mobx-react";
import { AppComponentListBase } from "@components/AppComponentBase";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Row, Card } from "antd";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  registerables as registerablesJS,
} from "chart.js";
import withRouter from "@components/Layout/Router/withRouter";
import { Pie } from "react-chartjs-2";
export interface IInOutChartProps {
  Title: any;
}

export interface IInOutChartState {
  typesName: any[];
}
// const data = {
//   labels: ["0 - 15", "15 - 30", "	30 -45", "45 - ..."],
//   datasets: [
//     {
//       data: [3, 10, 10, 10],
//       backgroundColor: ["#27AE60", "#FEC20C", "#F2994A", "#2284aa"],
//       display: true,
//       // borderColor: "#D1D6DC",
//     },
//   ],
// };
ChartJS.register(...registerablesJS, ArcElement, Tooltip, Legend);
export const globalPlugins: any = (additionPlugin?) => ({
  ...additionPlugin,
  legend: {
    position: "right",
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
class InOutChart extends AppComponentListBase<
  IInOutChartProps,
  IInOutChartState
> {
  formRef: any = React.createRef();
  state = {
    typesName: [],
  };

  componentDidMount = async () => {};
  dataInOut = {
    labels: ["0 - 15", "15 - 30", "	30 -45", "45 - ..."] ?? [],
    datasets: [
      {
        data: [3, 10, 10, 10],
        backgroundColor: ["#27AE60", "#FEC20C", "#ffa251", "#2284aa"],
        display: true,
        // borderColor: "#D1D6DC",
      },
    ],
  };
  public render() {
    return (
      <>
        <Card style={{ borderRadius: "16px" }}>
          <strong>{this.props.Title}</strong>
          <div>
            <Row gutter={[2, 2]}>
              <Card style={{ borderRadius: "16px", width: "100%" }}>
                {/* <Col sm={{ span: 12, offset: 0 }}></Col> */}
                <Pie
                  height={300}
                  plugins={[ChartDataLabels]}
                  data={this.dataInOut}
                  options={{
                    maintainAspectRatio: false,
                    plugins: globalPlugins(),
                  }}
                />
              </Card>
            </Row>
          </div>
        </Card>
      </>
    );
  }
}

export default withRouter(InOutChart);
