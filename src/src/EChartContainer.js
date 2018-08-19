import React, { PureComponent } from "react";
import ReactECharts from "echarts-for-react";

export default class EChartContainer extends PureComponent {
  static echarts_react;
  state = {
    option: this.props.option
  };
  _onChartReadyCallback = () => {
    console.log("on chart ready callback");
  };

  _handleChartClick = params => {
    console.group("handle chart click");
    console.log("Param:", params);
    console.groupEnd();
    const label = window.prompt("Label:");
  };

  _getEvents = () => {
    return {
      click: this._handleChartClick
    };
  };
  render() {
    const { option } = this.state;
    return (
      <ReactECharts
        option={option}
        ref={e => {
          this.echarts_react = e;
        }}
        onChartReady={this._onChartReadyCallback}
        onEvents={this._getEvents()}
      />
    );
  }
}
