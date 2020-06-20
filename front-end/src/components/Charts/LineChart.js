import React from "react";
import {color} from './config'
import Chart from "react-google-charts";
const LineChart=props=>{
    const d = [
        ['x', 'Views'],
        [0, 0],
        [1, 10],
        [2, 23],
        [3, 17],
        [4, 18],
        [5, 9],
        [6, 11],
        [7, 27],
        [8, 33],
        [9, 40],
        [10, 32],
        [11, 35],
    ]
    const {width='400px',height='270px',data=d,hTitle='',vTitle=''}=props
    return <Chart
        width={width}
        height={height}
        chartType="LineChart"
        loader={<div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
        </div>}
        data={data}
        options={{
            hAxis: {
                title: hTitle,
            },
            vAxis: {
                title: vTitle,
            },
            colors: [color.light,color.green],
        }}

    />
}

export default LineChart
