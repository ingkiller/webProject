import React,{memo} from "react";
import Avatar from "react-avatar";
import moment from "moment";

const PostCard = props=>{
    const {user:{_id,name},title,date,category,content}=props.item
    const _onLinkClick=event=>{
        event.preventDefault()
        const path = event.target.getAttribute('data-path')
        props.onLinkClick(path)

    }
    return <div className="card">
        <div className="card-body">
            <div className="row justify-content-between mb-1">
                <div className="d-flex flex-row">
                    <Avatar size={50} round name={name}></Avatar>

                    <div className="d-flex flex-column pl-2">
                        <div className="d-flex justify-content-between">
                            <span><a href={"/user/"+_id+"/viewprofile"} data-path={"/user/"+_id+"/viewprofile"} onClick={_onLinkClick}>{name}</a></span>
                            <span>{category}</span>
                        </div>
                        <span className="text-muted">{title}-{moment(date).format("dddd, MMMM Do YYYY, h:mm:ss a")}</span>
                    </div>
                </div>


            </div>
            <div className="dropdown-divider"></div>
            <div className="row px-2">
                <p>{content}</p>
            </div>
        </div>
    </div>
}

export default memo(PostCard)
