import React, { Component } from "react";
import ReactECharts from "echarts-for-react";

export default class EChartContainer extends Component {
  static echarts_react;
  state = {
    option: this.props.option
  };

  shouldComponentUpdate() {
    return true;
  }

  _onChartReadyCallback = () => {
    console.log("on chart ready callback");
  };

  _handleChartClick = params => {
    console.group("handle chart click");
    console.log("Param:", params);
    console.log("");
    const labelValue = window.prompt("Label:");
    console.log("Label value", labelValue);

    if (labelValue === null && params.seriesType !== "boxplot") return;
    let series = this.state.option.series;
    let labelSeries = series.splice(params.seriesIndex + 2, 1)[0];
    labelSeries = {
      ...labelSeries,
      data: [
        ...labelSeries.data,
        [params.data[0], params.data[1] - 10, labelValue]
      ]
    };
    series.splice(params.dataIndex + 2, 0, labelSeries);
    console.log("New series", series);
    console.groupEnd();
    this.setState({ option: { ...this.state.option, series } });
  };

  _getEvents = () => {
    return {
      click: this._handleChartClick
    };
  };
  render() {
    console.log("render");
    const { option } = this.state;
    return (
      <ReactECharts
        style={{ height: 700 }}
        option={option}
        ref={e => {
          this.echarts_react = e;
        }}
        notMerge={true}
        onChartReady={this._onChartReadyCallback}
        onEvents={this._getEvents()}
      />
    );
  }
}
