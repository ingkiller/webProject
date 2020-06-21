import React,{memo} from "react";

const Home = props=>{
    return <div className="container-fluid pt-3 containerHeight">
        <div className="row justify-content-center">
            <h1>Welcome</h1>
        </div>
        <div className="row justify-content-center">
            <div className="col-sm-12 col-md-6">
               <h4>@Posty </h4> <span>is a web application that allows us to publish Posts.</span>
            </div>
        </div>

    </div>
}

export default memo(Home)

