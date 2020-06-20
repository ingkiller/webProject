import React,{memo} from "react";
import {useHistory} from 'react-router-dom'
import {useDispatch} from "react-redux";
import {onLogOut} from "../../reducers/app";

const Header = props =>{

    const {isLogin,userId}=props
    const history = useHistory()
    const dispatch = useDispatch()

    const onMenuClick=event=>{
        event.preventDefault()
        const path = event.target.getAttribute('data-path')

        history.push(path)

    }
    const _onLogOut=event=>{
        event.preventDefault()
        dispatch(onLogOut())
        history.push('/home')
    }
    const getHeader=()=>{
        if(isLogin){
            return <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#">@Posty</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item ">
                            <a className="nav-link" href="/home" data-path={"/home"} onClick={onMenuClick}>Home <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/posts" data-path={"/posts"} onClick={onMenuClick}>Posts</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/posts/add" data-path={"/posts/add"} onClick={onMenuClick}>Add Posts</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/posts/stats" data-path={"/posts/stats"} onClick={onMenuClick}>Stats</a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" href="/posts/search" data-path={"/posts/search"} onClick={onMenuClick}>Search</a>
                        </li>

                    </ul>
                    <div className="btn-group dropleft">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                           data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            User
                        </a>
                        <div className="dropdown-menu mr-auto" aria-labelledby="navbarDropdown">
                            <a className="dropdown-item" href="/user/changepass" data-path={"/user/changepass"} onClick={onMenuClick}>Change Pass</a>
                            <a className="dropdown-item" href="/user/profile" data-path={"/user/"+userId+"/profile"} onClick={onMenuClick}>Profile</a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item" href="/home" onClick={_onLogOut}>LogOut</a>
                        </div>
                    </div>
                </div>
            </nav>
        }else {
            return <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#">@Posty</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="/home" data-path={"/home"} onClick={onMenuClick}>Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/posts" data-path={"/posts"} onClick={onMenuClick}>Posts</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/posts/search" data-path={"/posts/search"} onClick={onMenuClick}>Search</a>
                        </li>
                    </ul>
                    <ul className="navbar-nav">
                        <li className="nav-item ">
                            <a className="nav-link " href="/signin" data-path={"/signin"} onClick={onMenuClick}>SignIn</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-primary" href="/signup" data-path={"/signup"}>SignUp</a>
                        </li>
                    </ul>

                </div>
            </nav>
        }
    }
    return getHeader()
}

export default memo(Header)
