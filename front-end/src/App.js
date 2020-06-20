import React, {useState,useEffect} from 'react';

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import './App.css'
import docCookies from "./communs/cookie";
import {useSelector,useDispatch} from "react-redux";
import {init} from "./reducers/app";
import {LogOut,LogIn} from './pages'

const  App=(props)=> {
  const {isInit,user,token,isLogin}=useSelector(state=>state.app)
    const dispatch = useDispatch()
    useEffect(()=>{
        console.log('call init')
        dispatch(init())
    },[])
  const [_isLogin,setIsLogin]=useState(false)

    const render = ()=>{

        if(isInit)
            return <span>"loading"</span>

        if(isLogin)
            return  <LogIn/>
        return <LogOut/>
    }

  return (<div>
        {
           // (isLogin && docCookies.getItem('token') !== null)?<LogIn/>:<LogOut/>
        }
          {
              render()
          }
      </div>
  );
}
export default App;
