import React, {memo, useCallback, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {userChangePass} from "../reducers/app";
import {debounce} from "lodash";

const UserChangePass=props=>{
    const dispatch = useDispatch()
    const {app:{isChangePass, changePass, errorChangePass}}=useSelector(state=>state)

    const [oldPass,setOldPass]=useState("")
    const [pass,setPass]=useState("")
    const [rpass,setRPass]=useState("")

    const [errorPass,setError]=useState(false)
    const [msgError,setMsgError]=useState("")

    const [success,setSuccess]=useState(false)
    const [successMsg,setSuccessMsg]=useState("")

    const delayOldPass = useCallback(debounce((value)=>{
        setOldPass(value)

    },500),[])

    const onChangeOldPass=event=>{
        event.preventDefault()
        delayOldPass(event.target.value)
    }

    const delayPass = useCallback(debounce((value)=>{
        setPass(value)
    },500),[])

    const onChangePass=event=>{
        event.preventDefault()
        delayPass(event.target.value)
    }

    const delayRPass = useCallback(debounce((value)=>{
        setRPass(value)
    },500),[])

    const onChangeRPass=event=>{
        event.preventDefault()
        delayRPass(event.target.value)
    }

    const _onSubmit=event=>{
        event.preventDefault()
        setError(false)
        if(oldPass === pass){
            setError(true)
            setMsgError('New password must be different from the current one.')
            setSuccess(false)
            setSuccessMsg(null)
            return false
        }
        if(pass === rpass)
            dispatch(userChangePass({oldPass:oldPass,newPass:pass})).then(result=>{
                if(result.payload.success === true){
                    setError(false)
                    setMsgError('')
                    setOldPass("")
                    setPass("")
                    setRPass("")
                    setSuccess(true)
                    setSuccessMsg("Pass changed!!.")
                }

            })
        else {
            setError(true)
            setMsgError('Pass and confirm pass must be equals.')
            setSuccess(false)
            setSuccessMsg(null)
            return false
        }
    }
    const displayError=()=>{

        if(errorPass)
            return <div className="alert alert-danger" role="alert">
                {msgError}
            </div>
        if(errorChangePass.errorCode === 422){
            return <div className="alert alert-danger" role="alert">
                Incorrect current pass.
            </div>
        }
        if(errorChangePass.errorCode === 500){
            return <div className="alert alert-danger" role="alert">
                System Error, please contact site admin.
            </div>
        }
        return null
    }
    const render=()=>{
console.log('re render')
        return <div className="card">
            <div className="card-body">
                <form onSubmit={_onSubmit} className="form"  role="form" id="formLogin">
                    <div className="form-group">
                        <label>Current Password</label>
                        <input type="password" className="form-control form-control-lg rounded-0"
                               name="old_pass" minLength={6} id="old_pass" onChange={onChangeOldPass}/>
                    </div>
                    <div className="form-group">
                        <label>New Password</label>
                        <input type="password" className="form-control form-control-lg rounded-0"
                               name="password" minLength={6} id="password" onChange={onChangePass}/>
                    </div>
                    <div className="form-group">
                        <label>Repeat New Password</label>
                        <input type="password" className="form-control form-control-lg rounded-0"
                               name="rpassword" minLength={6} id="rpassword" onChange={onChangeRPass}/>
                    </div>

                    {
                        success && <div className="alert alert-success" role="alert">
                            {successMsg}
                        </div>
                    }
                    {
                        displayError()
                    }
                    {
                        isChangePass?<div className="spinner-border text-primary" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>: <button type="submit" className="btn btn-primary float-right"
                                        id="btnLogin">Change
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

export default memo(UserChangePass)
