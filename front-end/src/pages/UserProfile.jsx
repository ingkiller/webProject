import React, {memo, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from 'react-router-dom'
import moment from "moment";
import {updateUserProfile} from "../reducers/app";
import {requestUserProfile} from "../reducers/user";
import Avatar from "react-avatar";
const UserProfile=props=>{
    const dispatch = useDispatch()
    const {errorUser,isFetchingUser}=useSelector(state=>state.user)
    const params = useParams()


    const [_name,setName]=useState("")
    const [_email,setEmail]=useState("")
    const [_about,setAbout]=useState()
    const [_countPost,setCountPost]=useState()
    const [_date,setDate]=useState("")

    const onChangeName=event=>{
        event.preventDefault()
        setName(event.target.value)
    }

    const onChangeAbout=event=>{
        event.preventDefault()
        setAbout(event.target.value)
    }


    useEffect(()=>{
        if(params.id !== undefined)
            dispatch(requestUserProfile({userId:params.id})).then(result=>{
                console.log('date:',result.payload)
                if(result.payload.error === undefined){
                    const {countPost,date,email,name,about}=result.payload
                    setName(name)
                    setEmail(email)
                    setDate(date)
                    setCountPost(countPost)
                    setAbout(about)
                }
            })
    },[])


    const _onUpdateProfile=event=>{
        event.preventDefault()
        dispatch(updateUserProfile({email:_email,name:_name,about:_about}))
    }
    const render=()=>{

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

        if(_name === ""){
            return  <div className="alert alert-info" role="alert">
                No data to display.
            </div>
        }

        return <div className="card mt-3">
            <div className="card-header d-flex justify-content-center">
                <Avatar round size={100} name={_name}/>
            </div>
            <div className="card-body">

                <form onSubmit={_onUpdateProfile} className="form"  role="form" id="formLogin">
                    <div className="form-group">
                        <label htmlFor="name">Full Name</label>
                        <input type="text" value={_name} className="form-control form-control-lg rounded-0"
                               name="name" id="name" required onChange={onChangeName}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" className="form-control form-control-lg rounded-0"
                               name="email" id="email" value={_email} readOnly/>

                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Post</label>
                        <input type="text" className="form-control form-control-lg rounded-0"
                               name="post" id="post" value={_countPost} readOnly/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Register Date</label>
                        <input type="text" className="form-control form-control-lg rounded-0"
                               name="date" id="date" value={moment(_date).format("YYYY/MM/DD HH:mm a")} readOnly/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="about">About you</label>
                        <textarea className="form-control rounded-0" id="about"
                                  rows="3" value={_about} onChange={onChangeAbout}></textarea>
                    </div>
                    {
                        isFetchingUser?<div className="spinner-border text-primary" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>: <button type="submit" className="btn btn-primary float-right"
                                        id="btnLogin">Update
                        </button>
                    }


                </form>
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

export default memo(UserProfile)
