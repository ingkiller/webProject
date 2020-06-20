import React,{memo} from "react";
import styled from "styled-components";
import Avatar from "react-avatar";
import moment from "moment";

const Container = styled.li`
  display:flex;
       justify-content: space-between!important;
      
       position: relative;
       margin: .2em;
       
       `
const Divider = styled.div`height: 0;
                    width:100%!important;
                    margin: .5rem -1rem 0;
                    overflow: hidden;
                    border-top: 1px solid #e9ecef
                    `


const PostHeader = ({_id,name,title,date,category,onLinkClick})=>{

    const _onLinkClick=event=>{
        event.preventDefault()
        const path = event.target.getAttribute('data-path')
        onLinkClick(path)

    }
    return <div className="row justify-content-between mb-1">
        <div className="d-flex flex-row">
            <Avatar size={50} round name={name}></Avatar>

            <div className="d-flex flex-column pl-2">
                <span><a href={"/user/"+_id+"/viewprofile"} data-path={"/user/"+_id+"/viewprofile"} onClick={_onLinkClick}>{name}</a> </span>
                <span className="text-muted">{title}-{moment(date).format("dddd, MMMM Do YYYY, h:mm:ss a")}</span>
            </div>
        </div>
        <div className="mr-4"><span>{category}</span></div>

    </div>
}

const PostFooter = (props)=>{

    const _clickViewComment=event=>{
        event.preventDefault()
        props.onClickComment(props.item)
    }
    return <div className={"d-flex px-0 my-0 " + (props.isLogin === true?"justify-content-between":"justify-content-start")}>

        <div className="d-flex align-items-center my-1">
            <span><a href="/" onClick={_clickViewComment}>Comments:</a> </span>
            <span >{props.item.commentCount}</span>
        </div>
        {
            props.isLogin && <div className="d-flex">
                <button className="btn small" onClick={_clickViewComment}>Comment</button>
            </div>
        }

    </div>
}

const PostItem = props=>{
    const{user:{_id,name},title,date,content,category}=props.item

    return <Container >
        <div className="card w-100 pl-4 pt-1">

                <PostHeader _id={_id}
                            name={name}
                            title={title}
                            date={date}
                            category={category}
                            onLinkClick={props.onLinkClick}
                />
                <div className="" style={{maxHeight:'50px', overflow:'scroll'}}>
                    <span>{content}</span>

                </div>
                <Divider/>

                <PostFooter {...props}/>

        </div>
    </Container>
}

export default memo(PostItem)
