import React,{memo} from "react";
import { BrowserRouter as Router,Switch,Route,Redirect} from 'react-router-dom'
import {Home, Posts,  SigIn, SignUp} from "./index";
import {Header,Footer,PostComments} from  '../components'
import SearchPost from "./SearchPost";
import ViewUserProfile from "./ViewUserProfile";

const logOutRoutes=[{path:"/home",component:Home},
    {path:"/posts/:id/comment",component:PostComments},
    {path:"/posts/search",component:SearchPost},
    {path:"/posts",component:Posts},
    {path:"/user/:id/viewprofile",component:ViewUserProfile},
    {path:"/signin",component:SigIn},
    {path:"/signup",component:SignUp}]
const LogOut = props=>{
    return <div className="container-fluid">
        <Router>
            <Header isLogin={false}/>
            <Switch>
                {
                   logOutRoutes.map((item,key)=>( <Route key={key} path={item.path} component={ item.component }/>))
                }
                <Redirect from='*' to="/posts" />
            </Switch>
        </Router>
        <Footer></Footer>
    </div>
}
export default memo(LogOut)
