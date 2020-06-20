import React,{memo} from "react";
import Avatar from "react-avatar";
import moment from "moment";

const CommentItem = props=>{
    const{user:{_id,name},date,content}=props.item
    const _onLinkClick=event=>{
        event.preventDefault()
        const path = event.target.getAttribute('data-path')
        props.onLinkClick(path)

    }
    return <div className="col-12 mb-2">
        <div className="card">
            <div className="card-body pt-1">
                <div className="row justify-content-between mb-1">
                    <div className="d-flex flex-row">
                        <Avatar size={30} round name={name}></Avatar>
                        <div className="d-flex flex-column pl-2">
                            <span><a href={"/user/"+_id+"/viewprofile"} data-path={"/user/"+_id+"/viewprofile"} onClick={_onLinkClick}>{name}</a></span>
                        </div>
                    </div>
                    <span className="text-muted ">{moment(date).fromNow().toString()}</span>
                </div>
                <div className="dropdown-divider"></div>
                <div className="" style={{maxHeight:'50px', overflow:'scroll'}}>
                    <span>{content}</span>
                </div>
            </div>
        </div>
    </div>
}
export default memo(CommentItem)
