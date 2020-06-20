import React,{memo} from "react";
import { BrowserRouter as Router,Switch,Route,Redirect} from 'react-router-dom'
import {useSelector,useStore} from "react-redux";
import {Header,Footer,PostComments} from '../components'

import {Posts, PostAdd, Home} from './index'
import Stats from "./Stats";
import UserProfile from "./UserProfile";
import SearchPost from "./SearchPost"
import ViewUserProfile from './ViewUserProfile'
import UserChangePass from "./UserChangePass";

const loginRoutes=[
    {path:"/home",component:Home},
    {path:"/posts/add",component:PostAdd},
    {path:"/posts/:id/comment",component:PostComments},
    {path:"/posts/stats",component:Stats},
    {path:"/posts/search",component:SearchPost},
    {path:"/posts",component:Posts},
    {path:"/user/changepass",component:UserChangePass},
    {path:"/user/:id/profile",component:UserProfile},
    {path:"/user/:id/viewprofile",component:ViewUserProfile},
]

const LogIn = ()=>{
    const store = useStore()
    console.log('store:',store.getState().app)

    const {_id:userId}=useSelector(state=>state.app.user)
    return <div className="container-fluid ">
        <Router >
            <Header isLogin={true} userId={userId}/>
            <Switch>
                {
                    loginRoutes.map((item,key)=>( <Route key={key} path={item.path} component={ item.component }/>))
                }
                <Redirect from='*' to="/posts" />
            </Switch>
            <Footer/>
        </Router>
    </div>


}
export default memo(LogIn)
