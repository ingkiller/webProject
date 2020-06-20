import React,{memo,useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {onLogin} from "../reducers/app";

const SingIn = props=>{
    const dispatch = useDispatch()
    const [email,setEmail]=useState("")
    const [pass,setPass]=useState("")
    const [error,setError]=useState(false)
    const [errorMsg,setErrMsg]=useState("")
    const {isFetchingUser}=useSelector(state=>state.app.isFetchingUser)
    const onChangeEmail=event=>{
        event.preventDefault()
        setEmail(event.target.value)
    }
    const onChangePass=event=>{
        event.preventDefault()
        setPass(event.target.value)
    }
    const onSubmit=(event)=>{
        event.preventDefault()
        if(email !== "" && pass !== "")
            dispatch(onLogin({email,pass})).then(result=>{
                if(result.payload.error){
                    if(result.payload.errorCode === 422) {
                        setError(true)
                        setErrMsg('User or pass incorrect.')
                    }
                }
            })

    }
    return <div className="container-fluid containerHeight">
            <div className="row h-100 align-items-center">
                <div className="col-md-12 d-flex mb-5 flex-column">
                    <div className="row">
                        <div className="col-lg-6 col-md-8 mx-auto">
                            <div className="card rounded shadow shadow-sm">
                                <div className="card-header text-center">
                                    <h3 className="mb-0">Sign In</h3>
                                </div>
                                <div className="card-body">

                                    <form className="form" onSubmit={onSubmit} id="formLogin" method="POST">
                                        <div className="form-group">
                                            <label htmlFor="email">Email</label>
                                            <input type="email" className="form-control form-control-lg rounded-0"
                                                   name="email" id="email" required onChange={onChangeEmail}/>
                                        </div>
                                        <div className="form-group">
                                            <label>Password</label>
                                            <input type="password" className="form-control form-control-lg rounded-0"
                                                   name="password" id="password"  required onChange={onChangePass}/>

                                        </div>
                                        {
                                            error && <div className="alert alert-danger" role="alert">
                                                {errorMsg}
                                            </div>
                                        }
                                        {
                                            isFetchingUser?<div className="spinner-border text-primary" role="status">
                                                <span className="sr-only">Loading...</span>
                                            </div>:  <button type="submit" className="btn btn-primary btn-lg float-right"
                                                             id="btnLogin">Login
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

export default memo(SingIn)
