import React,{memo} from "react";
import Chart from "react-google-charts";
import PropTypes from 'prop-types';

const BarChart=props=>{

    const {width='400px',height='400px',data,title='',subtitle=''}=props
    return <Chart
        width={width}
        height={height}
        chartType="Bar"
        loader={<div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
        </div>}
        data={data}
        options={{
            chart: {
                title: title,
                subtitle: subtitle,
            },
        }}
    />
}
BarChart.propTypes={
    width:PropTypes.number,
    height:PropTypes.number,
    data:PropTypes.array.isRequired,
    title: PropTypes.string,
    subtitle: PropTypes.string

}
export default memo(BarChart)
