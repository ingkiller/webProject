import React,{memo,useEffect} from "react";
import Avatar from "react-avatar";
import {useDispatch,useSelector} from "react-redux";
import {requestUserProfile} from "../reducers/user";
import {useParams} from 'react-router-dom'

const ViewUserProfile=(props)=>{
    const dispatch = useDispatch()
    const {data,errorUser,isFetchingUser}=useSelector(state=>state.user)
    const params = useParams()
    useEffect(()=>{
        //userid
        console.log('params:',params)
        if(params.id !== undefined)
           dispatch(requestUserProfile({userId:params.id}))
    },[])


    const render=()=>{
        console.log('isFetchingUser:',isFetchingUser)
        if(errorUser){
            return <div className="alert alert-danger" role="alert">
                System error, please contact site admin.
            </div>
        }
        if(isFetchingUser === true){
            return <div className="row justify-content-center"><div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
            </div></div>
        }

        if(data.name === undefined){
            return  <div className="alert alert-info" role="alert">
                No data to display.
            </div>
        }
        const {name,email,about,countPost}=data
        return <div className="card">
            <div className="card-header d-flex justify-content-center">
                <Avatar round size={100} name={name}/>
            </div>
            <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <h6 className="card-title">{email}</h6>
                <p className="card-text">{about}</p>
                <h6 className="card-title">Posts: {countPost}</h6>
            </div>
        </div>
    }


    return  <div className="container-fluid pb-5 containerHeight  ">
        <div className="row h-100 align-items-center justify-content-center">
            <div className="col-sm-12 col-md-6">
                {
                    render()
                }
            </div>
        </div>
    </div>
}

export default memo(ViewUserProfile)
