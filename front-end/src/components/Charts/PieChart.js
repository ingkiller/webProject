import React from "react";
import Chart from "react-google-charts";

const PieChart=props=>{
    const d = [["Age", "Weight"], ["a", 12], ["b", 5.5]]
    const{pieHole=0,width="400px", height="400px",data=d}=props
    const pieOptions = {
        title: "Post",
        pieHole: pieHole,

        legend: {
            position: "bottom",
            alignment: "center",
            textStyle: {
                color: "#233238",
                fontSize: 14
            }
        },
        tooltip: {
            showColorCode: true
        },
        chartArea: {
            left: 0,
            top: 0,
            width: "100%",
            height: "80%"
        }
    };
    return  <Chart
        chartType="PieChart"
        data={data}
        options={pieOptions}
        width={width}
        height={height}
    />
}

export default PieChart
