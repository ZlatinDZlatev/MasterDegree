import React from "react";
import Chart from 'react-google-charts'

const PieChart = (props) => {
    const { chartData, title } = props;
      const options = {
        title: title,
      };
    
      return (
        <div>
          <Chart
            chartType="PieChart"
            width="100%"
            height="500px"
            data={chartData}
            options={options}
          />
        </div>
      );
};

export default PieChart;




