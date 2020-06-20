import React, {memo, useState} from "react";
import {useDispatch,useSelector} from "react-redux";
import {onSignUp} from "../reducers/app";

const SingUp = props=>{
    const dispatch = useDispatch()
    const {isFetchingUser}=useSelector(state=>state.app.isFetchingUser)
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [pass,setPass]=useState("")
    const [rpass,setRPass]=useState("")
    const [about,setAbout]=useState("")

    const [error,setError]=useState(false)
    const [msgError,setMsgError]=useState("")

    const onChangeName=event=>{
        event.preventDefault()
        setName(event.target.value)
    }
    const onChangeEmail=event=>{
        event.preventDefault()
        setEmail(event.target.value)
    }
    const onChangePass=event=>{
        event.preventDefault()
        setPass(event.target.value)
    }
    const onChangeRPass=event=>{
        event.preventDefault()
        setRPass(event.target.value)
    }
    const onChangeAbout=event=>{
        event.preventDefault()
        setAbout(event.target.value)
    }
    const _onSignUp=(event)=>{
        event.preventDefault()
        event.stopPropagation()
        console.log('_onSignUp')


        if(pass !== rpass){
            setError(true)
            setMsgError('Pass and confirm pass must be equals.')
            return false
        }else{
            setError(false)
            setMsgError('')
            dispatch(onSignUp({name,email,pass,about})).then(result=>{
                if(result.payload.error){
                    if(result.payload.errorCode===422){
                        setError(true)
                        setMsgError('This email already exist!!')
                    }else{
                        setError(true)
                        setMsgError('System error, contact site admin.')
                    }
                }
            })
        }


    }
    return <div className="container-fluid ">
        <div className="row">
            <div className="col-md-12 d-flex flex-column my-5">
                <div className="row">
                    <div className="col-lg-6 col-md-8 mx-auto">
                        <div className="card rounded shadow shadow-sm">
                            <div className="card-header text-center">
                                <h3 className="mb-0">Sign Up</h3>
                            </div>
                            <div className="card-body">

                                <form onSubmit={_onSignUp} className="form" id="formLogin">
                                    <div className="form-group">
                                        <label htmlFor="name">Full Name</label>
                                        <input type="text" className="form-control form-control-lg rounded-0"
                                               name="name" id="name" required onChange={onChangeName}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input type="email" className="form-control form-control-lg rounded-0"
                                               name="email" id="email" required onChange={onChangeEmail}/>

                                    </div>
                                    <div className="form-group">
                                        <label>Password</label>
                                        <input type="password" className="form-control form-control-lg rounded-0"
                                               name="password" minLength={6} id="password" required onChange={onChangePass}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Repeat Password</label>
                                        <input type="password" className="form-control form-control-lg rounded-0"
                                               name="rpassword" minLength={6} id="rpassword" required onChange={onChangeRPass}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="about">About you</label>
                                        <textarea className="form-control rounded-0" id="about"
                                                  rows="3" onChange={onChangeAbout}></textarea>
                                    </div>
                                    {
                                        error && <div className="alert alert-danger" role="alert">
                                            {msgError}
                                        </div>
                                    }
                                    {
                                        isFetchingUser?<div className="spinner-border text-primary" role="status">
                                            <span className="sr-only">Loading...</span>
                                        </div>: <button type="submit" className="btn btn-primary float-right"
                                                                id="btnLogin">Sign Up
                                        </button>
                                    }


                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default memo(SingUp)
