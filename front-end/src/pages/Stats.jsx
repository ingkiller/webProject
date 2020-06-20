import React,{memo,useEffect,useState} from "react";
import {BarChart,PieChart} from '../components/Charts'
import {useSelector,useDispatch} from "react-redux";
import {requestStats} from "../reducers/stats";

const Stats=props=>{

    const {barData,pieData,errorStats,isFetchingStats}=useSelector(state=>state.stats)
    const [chart,setChart]=useState("bar")
    const dispatch = useDispatch()


    useEffect(()=>{
        dispatch(requestStats())
    },[])

    const _onChangeChart=event=>{
        event.preventDefault()
        setChart(chart === "bar"?"pie":"bar")
    }

    const display=()=>{
        console.log('errorStats:',errorStats)
        console.log('isFetchingStats:',isFetchingStats)
        if(errorStats){
            return <div className="row justify-content-center">
                <div className="alert alert-danger" role="alert">
                    Error system, please contact site admin.
                </div>
            </div>
        }
        if(isFetchingStats)
            return <div className="row justify-content-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        if(chart === "bar")
            return <div className="row justify-content-center mt-4">
                      <BarChart title={"Post"} subtitle={""} data={barData}/>
                </div>

        return <div className="row justify-content-center mt-4">
                <PieChart data={pieData}/>
            </div>

    }

    return <div className="container-fluid pt-3 containerHeight">

        {
            (!errorStats && !isFetchingStats) && <div className="row justify-content-center mb-3">
                <div className="btn-group" role="group" aria-label="">
                    <button type="button" className={"btn "+(chart === "bar"?"btn-primary":"btn-secondary")} onClick={_onChangeChart}>BarChart</button>
                    <button type="button" className={"btn "+(chart === "bar"?"btn-secondary":"btn-primary")} onClick={_onChangeChart}>PieChart</button>
                </div>
            </div>
        }
        {
            display()
        }
    </div>
}

export default memo(Stats)
